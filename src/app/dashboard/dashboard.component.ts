import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import date from 'date-and-time';
import * as $ from 'jquery';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	
	totaldoctor:any;
	totalpatient:any;
	totalresepsinist:any;
  happyclient:any;
  todaysappo:any;
  totalappo:any;
  role:any;
  cliniclists:any;
  clinicbyid:any;
  clinic_name:any = '';
  clinic_email_id:any = '';
  clinic_id:any = '';


	constructor( private http: Http,private router: Router) {

	}
  
  
	ngOnInit() {
    this.role = localStorage.getItem("role");
    this.clinic_email_id = localStorage.getItem("clinic_email_id");
    this.clinic_id = localStorage.getItem("clinic_id");

		this.getDoctorCount(this.clinic_id);
		this.getPatientCount(this.clinic_id);
		this.getReceptionistCount(this.clinic_id);
    this.getHappyclientCount(this.clinic_id);
    this.getTodaysappoCount(this.clinic_id);
    this.getTotalappoCount(this.clinic_id);
    this.getclinic();
	}

	  getDoctorCount(clinic_id) {
		    const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
        let search = new URLSearchParams();
        this.http.get(environment.apiUrl+"/api/dashboard/list?role=doctor&clinic_id="+clinic_id,headers).subscribe(res =>
            this.totaldoctor = res.json().result
        );
  	}

  	getPatientCount(clinic_id) {
		    const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
        let search = new URLSearchParams();
        this.http.get(environment.apiUrl+"/api/dashboard/list?role=patient&clinic_id="+clinic_id,headers).subscribe(res =>
            this.totalpatient = res.json().result
        );
  	}

  	getReceptionistCount(clinic_id) {
		    const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
        let search = new URLSearchParams();
        this.http.get(environment.apiUrl+"/api/dashboard/list?role=receptionist&clinic_id="+clinic_id,headers).subscribe(res =>
            this.totalresepsinist = res.json().result
        );
  	}


    getHappyclientCount(clinic_id) {
        const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
        let search = new URLSearchParams();
        this.http.get(environment.apiUrl+"/api/dashboard/list?status=1&clinic_id="+clinic_id,headers).subscribe(res =>
            this.happyclient = res.json().result
        );
    }

    getTodaysappoCount(clinic_id) {
        const now = new Date();
        var today = date.format(now, 'YYYY-MM-DD');
        const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
        let search = new URLSearchParams();
        this.http.get(environment.apiUrl+"/api/dashboard/list?appointment_date="+today+"&clinic_id="+clinic_id,headers).subscribe(res =>
            this.todaysappo = res.json().result
        );
    }

    getTotalappoCount(clinic_id) {
        const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
        let search = new URLSearchParams();
        this.http.get(environment.apiUrl+"/api/dashboard/list?clinic_id="+clinic_id,headers).subscribe(res =>
            this.totalappo = res.json().result
        );
    }

    createAuthorizationHeader(headers: Headers) {
        let auth = localStorage.getItem("auth");
        headers.append('authorization', auth);
        headers.append('Access-Control-Allow-Headers' , 'authorization');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*');
    }

    getclinic() {

      let headers = new Headers();
      this.createAuthorizationHeader(headers);
      let url = environment.apiUrl+"/api/clinic/list";
      let search = new URLSearchParams();
      this.http.get(url,{headers: headers}).subscribe(
        res => {
           this.cliniclists = res.json().result;
        }
      );
    }

    getclinicbyid(id: any) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        this.http.get(environment.apiUrl+"/api/clinic/list?id="+id,{headers: headers}).subscribe((res) =>{
          this.clinicbyid = res.json().result[0];

          localStorage.setItem('clinic_id', this.clinicbyid._id);
          localStorage.setItem('clinic_name', this.clinicbyid.clinic_name);
          localStorage.setItem('clinic_email_id', this.clinicbyid.email_id);
          localStorage.setItem('clinic_phone_no', this.clinicbyid.phone_no);
          localStorage.setItem('clinic_address', this.clinicbyid.address);
          window.location.reload();

        },
        error => {
          console.log('error : '+JSON.stringify(error));
        });
    
    }



	
}
