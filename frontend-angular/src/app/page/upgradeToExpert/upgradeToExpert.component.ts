import { Component, OnInit } from '@angular/core';
import {APIService} from '../../@core/service/api.service';
import {APIData, RequestData} from '../../@core/service/models/api.data.structure';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-requestExpert',
  templateUrl: './template/upgradeToExpert.component.html',
  styleUrls: ['./template/upgradeToExpert.component.css'],
})
export class upgradeToExpertComponent implements OnInit {

  public requestStatus;
  public requests: any;
  constructor(private apiService:APIService ) { }

  ngOnInit() {}

  upgradeToExpertClick(){
    this.apiService.upgradeToExpert({ sender: '', recipient: 'admin', type: 'upgradeToExpert', status: '', createdAt: '', viewed: false }).subscribe((apiresponse: APIData)=>{
      this.requestStatus = apiresponse.msg;
    });
  } 
}