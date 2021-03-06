import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GalleryModule } from  '@ngx-gallery/core';
import { LightboxModule } from  '@ngx-gallery/lightbox';

import { MyMaterialModule } from './material';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostComponent } from './post/post.component';

import { CategoriesService } from './categories.service';
import { PostsListService } from './posts-list.service';
import { DoctorService } from './services/doctor.service';

import { ProfileComponent } from './profile/profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientsComponent } from './patients/patients.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { CheckupsComponent } from './checkups/checkups.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';
import { InterceptService } from './services/intercept.service';
import { SnackBarService } from './services/snack-bar.service';
import { CheckupsService } from './services/checkups.service';
import { PrescriptionService } from './services/prescription.service';
import { AppointmentService } from './services/appointment.service';
import { CanActivateViaAuthGuardService } from './services/can-activate-via-auth-guard.service';

import { AuthGuard } from './auth.guard';
import { DoctorServicesComponent } from './profile/doctor-services/doctor-services.component';
import { BasicInfoComponent } from './profile/basic-info/basic-info.component';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { SchoolingComponent } from './schooling/schooling.component';
import { EmailComponent } from './email/email.component';

const routes: Route[] =[
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'patients',
    component: PatientsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [ AuthGuard ]
  },  
  {
    path: 'messages',
    component: CalendarComponent,
    canActivate: [ AuthGuard ]
  }
  
]
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PostsListComponent,
    PostComponent,
    ProfileComponent,
    AppointmentsComponent,
    PatientsComponent,
    CalendarComponent,
    UploadAvatarComponent,
    CheckupsComponent,
    PrescriptionComponent,
    ContactComponent,
    LoginComponent,
    DoctorServicesComponent,
    BasicInfoComponent,
    AddPatientComponent,
    SchoolingComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot( routes ),
    BrowserAnimationsModule,
    GalleryModule.forRoot({thumbPosition: "left"}),
    LightboxModule.forRoot(),
    MyMaterialModule
  ],
  entryComponents: [ProfileComponent, UploadAvatarComponent, PrescriptionComponent, CheckupsComponent, EmailComponent , ContactComponent, BasicInfoComponent, DoctorServicesComponent, AddPatientComponent, SchoolingComponent ],
  providers: [CategoriesService, PostsListService, DoctorService,  SnackBarService, CheckupsService, PrescriptionService, AppointmentService, AuthService, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptService,
    multi: true
  },
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
