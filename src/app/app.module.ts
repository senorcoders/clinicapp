  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { HttpClientModule } from '@angular/common/http';
  import { RouterModule, Route } from '@angular/router';
  

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyMaterialModule } from './material';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostComponent } from './post/post.component';

import { CategoriesService } from './categories.service';
import { PostsListService } from './posts-list.service';
import { DoctorService } from './doctor.service';

import { ProfileComponent } from './profile/profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientsComponent } from './patients/patients.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { CheckupsComponent } from './checkups/checkups.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ContactComponent } from './contact/contact.component';

const routes: Route[] =[
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'appointments',
    component: AppointmentsComponent
  },
  {
    path: 'patients',
    component: PatientsComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'wordpress',
    component: PostsListComponent
  },
  {
    path: 'php',
    component: AppComponent
  },
  {
    path: 'php',
    component: AppComponent
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
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot( routes ),
    BrowserAnimationsModule,
    MyMaterialModule
  ],
  entryComponents: [ProfileComponent, UploadAvatarComponent, PrescriptionComponent, CheckupsComponent, ContactComponent],
  providers: [CategoriesService, PostsListService, DoctorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
