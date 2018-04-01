import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { SessionComponent } from './session/session.component';
import { RequestComponent } from './request/request.component';
import { RouterModule, Routes } from '@angular/router';
import { ExpertComponent } from './expert/expert.component';
const routes: Routes = [
 //{ path: 'session', component: SessionComponent },
  //{ path: 'request', component: RequestComponent },
 // { path: '', pathMatch: 'full', redirectTo: 'session' },
 // { path: '', pathMatch: 'full', redirectTo: 'request' },
  { path: 'expert', component: ExpertComponent },
  { path: '', pathMatch: 'full', redirectTo: 'expert' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
