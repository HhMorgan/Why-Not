import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { APIService } from '../../../@core/service/api.service';
import { APIData, User, FileData, Profile, Tag } from '../../../@core/service/models/api.data.structure'
import { ProfileComponent } from '../../profile/profile.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { SharedService } from '../../../@core/service/shared.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './template/setting.component.html',
  styleUrls: ['./template/setting.component.css']
})
export class SettingComponent implements OnInit {

  @Output() settingClose = new EventEmitter();

  public email: string;
  public username: string;
  public role: string;
  public description: string;
  public password: string;
  private profile = <Profile>{};
  private searchtag: string;
  private tags: Tag[];

  public searchInput;
  public searchParams;
  public searchChanged : Subject<string> = new Subject<string>();


  constructor(private apiServ: APIService, private sharedService: SharedService) {
    this.searchChanged.debounceTime(1000).distinctUntilChanged().subscribe(searchInput =>{
      this.searchParams = searchInput;
    });
  }

  changed(text: string){
    this.searchChanged.next(text);
  }

  ngOnInit() {
    this.getData();
  }

  updateemail() {
    var element = document.getElementById("inputemail");
    var groupofdanger = document.getElementById("groupdanger");
    this.profile.email = ((document.getElementById("inputemail") as HTMLInputElement).value)
    if (this.profile.email != '') {

      var x = document.getElementById("warning");
      this.apiServ.update_Email(this.profile).subscribe((apires: APIData) => {
        x.innerHTML = "either the format is wrong or the email is taken";
        if (apires.msg) {
          x.innerHTML = "" + apires.msg;
          groupofdanger.classList.remove("has-danger");
          groupofdanger.classList.add("has-success");
          element.classList.add("form-control-success");
          this.getData();
        }
        x.style.display = "block";
      }, (err) => {
        element.classList.remove("form-control-success");
        element.classList.add("form-control-danger");
        groupofdanger.classList.add("has-danger");
        groupofdanger.classList.remove("has-success");
        x.innerHTML = err.msg;
        x.style.display = "block";
      });
    }

  }

  UpdatePassword() {
    var element = document.getElementById("textdesc");
    var success = document.getElementById("succ");
    var EditingMsg = document.getElementById("warningPassword");
    var EditPasswordDiv = document.getElementById("EditPasswordDiv")
    this.profile.oldPassword = ((document.getElementById("oldpass") as HTMLInputElement).value)
    this.profile.password = ((document.getElementById("newpass") as HTMLInputElement).value)
    this.profile.confirmPassword = ((document.getElementById("confirmpass") as HTMLInputElement).value)
    if (true) {
      this.apiServ.update_Password(this.profile).subscribe((apires: APIData) => {
        if (apires.msg) {
          this.getData();
          EditPasswordDiv.classList.remove("has-danger");
          EditPasswordDiv.classList.add("has-success");
          EditingMsg.innerHTML = "" + apires.msg;

        }
        EditingMsg.style.display = "block";

      }, (err) => {
        EditPasswordDiv.classList.remove("has-success");
        EditPasswordDiv.classList.add("has-danger");
        EditingMsg.innerHTML = "" + err.msg; EditingMsg.style.display = "block";
      });
    }
  }


  UpdateDesc() {
    var element = document.getElementById("textdesc");
    var success = document.getElementById("succ");
    this.profile.description = ((document.getElementById("textdesc") as HTMLInputElement).value)
    if (this.profile.description != '') {

      this.apiServ.update_Desc(this.profile).subscribe((apires: APIData) => {
        if (apires.msg) {
          this.getData();
          success.innerHTML = "" + apires.msg;

        }
        success.style.display = "block";

      }, (err) => {

      });
    }


  }

  AddTag() {
    var tag = <Tag>{};
    var icon = event.target as HTMLElement
    var parentDiv = icon.parentElement as HTMLElement
    var parentDirowClass = parentDiv.parentElement as HTMLElement
    var parentDirowClass2 = parentDirowClass.parentElement as HTMLElement
    var firstDivOfRows = parentDirowClass.firstElementChild as HTMLElement
    var TagBtn = firstDivOfRows.firstElementChild as HTMLElement
    for (let currentTag of this.tags) {
      if (TagBtn.textContent == currentTag.name) {
        tag._id = currentTag._id;
        break;
      }
    }
    tag.name = TagBtn.textContent;
    //sends the tag name through addSpeciality which is later used to search for the tag and add it
    this.apiServ.addSpeciality(tag).subscribe((apiresponse: APIData) => {
      // this.triggernotifications("#34A853", apiresponse.msg);
    }, (err) => {
      //  this.triggernotifications("#EA4335", err.msg);
    });
  }

  closeSetting() {
    this.settingClose.emit("nothing");
  }

  editemail() {
    var x = document.getElementById("editemail");
    x.style.display = "none";
    var x = document.getElementById("editwithbuttons");
    x.style.display = "block";
    var x = document.getElementById("inputemail");
    x.style.display = "block";

  }

  editPasswordView() {
    var x = document.getElementById("editPassword");
    x.style.display = "none";
    var x = document.getElementById("EditPasswordDiv");
    x.style.display = "block";
  }

  CancelEditPasswordView() {
    var x = document.getElementById("editPassword");
    x.style.display = "block";
    var x = document.getElementById("EditPasswordDiv");
    x.style.display = "none";
  }

  CancelUpdateEmail() {
    var x = document.getElementById("warning");
    x.style.display = "block";
    x.style.display = "none";

    var x = document.getElementById("email");
    x.style.display = "block";
    var x = document.getElementById("editemail");
    x.style.display = "block";
    var x = document.getElementById("editwithbuttons");
    x.style.display = "none";
    var x = document.getElementById("inputemail");
    x.style.display = "none";

  }

  editdesc() {
    var x = document.getElementById("editdesc");
    x.style.display = "none";
    var x = document.getElementById("textdesc");
    x.style.display = "block";
    var x = document.getElementById("editwithbuttonsdesc");
    x.style.display = "block";

  }

  CancelUpdateDesc() {
    var x = document.getElementById("editdesc");
    x.style.display = "block";
    var x = document.getElementById("textdesc");
    x.style.display = "none";
    var x = document.getElementById("editwithbuttonsdesc");
    x.style.display = "none";
    var x = document.getElementById("succ");
    x.style.display = "none";
  }

  AddTagsClick() {
    var AddTagsBtn = document.getElementById("AddTagsBtn");
    x.style.display = "none";
    var x = document.getElementById("AddTagsBtn");
    x.style.display = "block";
  }

  getData() {
    this.apiServ.getUserData().subscribe((apires: APIData) => {
      this.email = apires.data.email;
      this.description = apires.data.description;
      this.password = apires.data.password;
      this.username = apires.data.username;
      this.role = apires.data.role;
    })
  }

  isExpert() {
    if (this.role == "expert") {
      return true;
    } else {
      return false;
    }
  }
}
