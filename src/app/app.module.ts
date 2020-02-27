import { BrowserModule, DomSanitizer  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpParams,HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { ReceptionstListComponent } from './receptionst-list/receptionst-list.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { ReceptionstAddComponent } from './receptionst-add/receptionst-add.component';
import { ReceptionstEditComponent } from './receptionst-edit/receptionst-edit.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { ClinicProfileComponent } from './clinic-profile/clinic-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppoinmentAddComponent } from './appoinment-add/appoinment-add.component';
import { AppoinmentEditComponent } from './appoinment-edit/appoinment-edit.component';
import { AppoinmentListComponent } from './appoinment-list/appoinment-list.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ClinicAddComponent } from './clinic-add/clinic-add.component';
import { ClinicEditComponent } from './clinic-edit/clinic-edit.component';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { ReceptionistProfileComponent } from './receptionist-profile/receptionist-profile.component';
import { SuperadminProfileComponent } from './superadmin-profile/superadmin-profile.component';
import { ReportUploadComponent } from './report-upload/report-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    DoctorListComponent,
    ReceptionstListComponent,
    DoctorAddComponent,
    DoctorEditComponent,
    ReceptionstAddComponent,
    ReceptionstEditComponent,
    PatientListComponent,
    PatientAddComponent,
    PatientEditComponent,
    ClinicProfileComponent,
    ForgotPasswordComponent,
    AppoinmentAddComponent,
    AppoinmentEditComponent,
    AppoinmentListComponent,
    AppointmentComponent,
    PrescriptionComponent,
    ClinicAddComponent,
    ClinicEditComponent,
    ClinicListComponent,
    ReceptionistProfileComponent,
    SuperadminProfileComponent,
    ReportUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot ([
      {
        path: 'report-upload/:id',
        component: ReportUploadComponent
      },
      {
        path: 'clinic-edit/:id',
        component: ClinicEditComponent
      },
      {
        path: 'clinic-add',
        component: ClinicAddComponent
      },
      {
        path: 'clinic-list',
        component: ClinicListComponent
      },{
        path: 'prescription/:id',
        component: PrescriptionComponent
      },
      {
        path: 'appoinment-edit/:id',
        component: AppoinmentEditComponent
      },
      {
        path: 'appoinment-add',
        component: AppoinmentAddComponent
      },
      {
        path: 'appoinment-list',
        component: AppoinmentListComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'receptionist-profile',
        component: ReceptionistProfileComponent
      },
      {
        path: 'superadmin-profile',
        component: SuperadminProfileComponent
      },
      {
        path: 'clinic-profile',
        component: ClinicProfileComponent
      },
      {
        path: 'patient-edit/:id',
        component: PatientEditComponent
      },
      {
        path: 'patient-add',
        component: PatientAddComponent
      },
      {
        path: 'patient-list',
        component: PatientListComponent
      },
      {
        path: 'doctor-edit/:id',
        component: DoctorEditComponent
      },
      {
        path: 'doctor-add',
        component: DoctorAddComponent
      },
      {
        path: 'doctor-list',
        component: DoctorListComponent
      },
      {
        path: 'receptionst-edit/:id',
        component: ReceptionstEditComponent
      },
      {
        path: 'receptionst-add',
        component: ReceptionstAddComponent
      },
      {
        path: 'receptionst-list',
        component: ReceptionstListComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }, 
      {
        path: 'login',
        component: LoginComponent
      },
      {path : '',redirectTo : 'login', pathMatch : 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
