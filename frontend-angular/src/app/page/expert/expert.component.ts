import { Component, OnInit } from '@angular/core';
import {APIService} from '../../@core/service/api.service';
import {APIData,Tags} from '../../@core/service/models/api.data.structure';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-request',
  templateUrl: './template/expert.component.html',
  styleUrls: ['./template/expert.component.css'],
 // providers:[APIService]
})
export class ExpertComponent implements OnInit {
  //speciality='accounting';
 public speciality;
 public editspeciality;
 public tags;


  requests: any;
  constructor(private apiService:APIService ) { }

  ngOnInit() {
    // this.apiService.getRequests().subscribe((response: APIData)=>{
    //   console.log(response);
    //   this.requests = response.data;
    // });
  }
 toRequests(){
  //redirected to requests page
 }
  addSpeciality(){
  //this.apiService.addSpeciality().subscribe((apiresponse: APIData)=>{
   if(this.speciality!=null){ //email to be removed and token added
    this.apiService.addSpeciality(this.speciality).subscribe((apiresponse: APIData)=>{
      console.log(apiresponse);
  });
 }
}
editSpeciality(){
  console.log(this.editspeciality);
    let x = <Tags>{_id : this.editspeciality};
     if(this.editspeciality!=null){ 
      this.apiService.editSpeciality(x,this.speciality).subscribe((apiresponse: APIData)=>{
        console.log(apiresponse);
    });
   }
  }
}
