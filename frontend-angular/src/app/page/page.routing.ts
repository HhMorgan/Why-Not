import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ExpertComponent } from './expert/expert.component';
import { HomeComponent } from './home/home.component';
import { SessionComponent } from './session/session.component';
import { SlotRequestComponent } from './slotRequest/slotRequest.component';
import { LoginComponent } from './auth/login/login.component'
import { AdminComponent } from './AdminPage/Admin.component'
import { TemplateComponent } from './template/template.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VideoViewComponent } from './videoView/videoView.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { RatingComponent } from './rating/rating.component';
import { viewScheduleComponent } from './viewSchedule/viewSchedule.component';
import { upgradeToExpertComponent } from './upgradeToExpert/upgradeToExpert.component';
import { ExpertsListComponent } from './expertsList/expertsList.component';
import { AdminPageUserComponent } from './AdminPageUser/AdminPageUser.component';
import { TagSearchComponent } from './tagSearch/tagSearch.component';
import { SessionVideoComponent } from './sessionVideoVoice/sessionvideo.component';
import { SessionChatMobileComponent } from './sessionChatMobile/session.component';
import { ScheduleComponent } from './Schedule/Schedule.component';

import { AdminViewUsersComponent } from './admin-view-users/admin-view-users.component';
import { AdminRatingComponent } from './components/admin-rating/admin-rating.component';

const routes: Routes = [
  { path: 'session', component: SessionComponent },
  { path: 'login' , component:LoginComponent},
  { path: 'signup' , component: SignupComponent},
  { path: 'dashboard', component:DashboardComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'home' , component:HomeComponent},
  { path: 'video' , component:VideoViewComponent},
  { path: 'videotest' , component:SessionVideoComponent},
  { path: 'profile' , component:ProfileComponent},
  { path: 'profile/:username' , component:ProfileComponent},

  { path: 'template' , component:TemplateComponent},
  { path: 'date-picker' , component:DatePickerComponent},
  { path: 'viewSchedule', component: viewScheduleComponent },
  { path: 'upgradeToExpert', component: upgradeToExpertComponent },
  { path: 'expert', component: ExpertComponent },
  { path: 'expertsList', component: ExpertsListComponent },
  {path:'tagSearch',component: TagSearchComponent},
  {path:'adminPage', component:AdminPageUserComponent},
  {path:'chat',component: SessionChatMobileComponent},

  { path: 'adminviewusers' , component:AdminViewUsersComponent},

  //{ path: 'session', component: SessionComponent },
//  { path: 'editProfile', component: ProfileComponent },
  { path: 'slotRequest', component: SlotRequestComponent },
  { path: 'rating', component: RatingComponent },
  { path: 'schedule', component: ScheduleComponent },
 

// { path: 'date-picker', component: DatePickerComponent },

//{ path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: 'admin-rating', component:AdminRatingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
  constructor() {
    //console.log(Router);    
  }  
  
}
