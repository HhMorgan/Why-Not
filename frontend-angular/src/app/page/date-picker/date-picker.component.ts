import { Component, OnInit } from '@angular/core';
import {APIService} from '../../@core/service/api.service';
import {APIData} from '../../@core/service/models/api.data.structure';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'date-picker',
  templateUrl: './template/date-picker.component.html',
  styleUrls: ['./template/date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  public scheduleDate1;
  public scheduleDate2; 
  public scheduleDate3; 
  public slotTime1;
  public slotTime2;
  public slotTime3;
  public user;
  public confirmationMessage;
constructor(private _apiService:APIService) { }

  ngOnInit() {
  }
  //---Method confirming the chosen slots
  confirmClick(){
    this.user = localStorage.getItem('sender');
    console.log(this.user);
    if(this.scheduleDate1 == null){
      console.log("hi");
    }else{
      console.log(this.slotTime1);
   
    this._apiService.chooseSlot({user: this.user,expert:'' ,slotDate1: this.scheduleDate1,slotTime1: this.slotTime1,slotDate2:this.scheduleDate2 ,slotTime2:this.slotTime2,slotDate3:this.scheduleDate3,slotTime3:this.slotTime3}).subscribe((apiresponse:APIData)=>(console.log(apiresponse)))
      
    }
  }

}
