//The ts document for the notifications page

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIService } from '../../@core/service/api.service';
import { APIData, Tag } from '../../@core/service/models/api.data.structure';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { SharedFunctions, SharedService } from '../../@core/service/shared.service';
@Component({
  selector: 'app-notification-list',
  templateUrl: './template/notification.list.component.html',
  styleUrls: ['./template/notification.list.component.scss']
})

export class NotificationListComponent implements OnInit, OnDestroy {
  private destroyed: ReplaySubject<boolean> = new ReplaySubject(1);
  private unreadNotificationCount: number = 0;
  public notificationsArray = [];
  ngOnInit() {
    this.refresh();
    Observable.interval(2 * 60 * 1000).takeUntil(this.destroyed).subscribe(() => {
      this.refresh();
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  constructor(private _apiService: APIService, private _sanitizer: DomSanitizer, private sharedService: SharedService) {

  }
  //The function that loads all the notifications from the backend
  refresh(): void {
    this.notificationsArray = [];
    this.unreadNotificationCount = 0;
    this._apiService.getNotifications().subscribe((apiresponse: APIData) => {
      for (var i = 0; i < apiresponse.data.length; i++) {
        let notification = apiresponse.data[i];
        if (!notification.read) {
          this.unreadNotificationCount++;
        }
        SharedFunctions.getImageUrl(apiresponse.data[i].sender.img).then((result) => {
          let message: String = notification.message;
          this.notificationsArray.push(
            {
              _id: notification._id,
              createdAt: new Date(notification.createdAt).toLocaleString(),
              sender: notification.sender.username,
              senderImg: this._sanitizer.bypassSecurityTrustResourceUrl(result.toString()),
              recipient: notification.recipient.username,
              type: notification.type,
              read: notification.read,
              messagetype: (notification.message.includes('url')) ? 'Link' : 'Message',
              message: (notification.message.includes('url')) ? notification.message.substring(4, notification.message.length) : notification.message,
              operationActive: false
            }
          );
        })
      }
      this.sharedService.updateUnreadNotification.emit(this.unreadNotificationCount);
    });
  }

  markAsRead(notification: any) {
    notification.operationActive = true;
    this._apiService.markNotificationAsRead(notification._id).subscribe((apiresponse: APIData) => {
      notification.read = true;
      notification.operationActive = false;
      this.sharedService.updateUnreadNotification.emit(--this.unreadNotificationCount);
    }, (err) => {
      notification.operationActive = false;
    });
  }

  delete(notification: any) {
    notification.operationActive = true;
    this._apiService.deleteNotification(notification._id).subscribe((apiresponse: APIData) => {
      if (!notification.read) {
        this.sharedService.updateUnreadNotification.emit(--this.unreadNotificationCount);
      }
      this.notificationsArray.splice(this.notificationsArray.indexOf(notification), 1);
    }, (err) => {
      notification.operationActive = false;
    });
  }
}

