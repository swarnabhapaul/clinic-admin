import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-clinic-add',
  templateUrl: './clinic-add.component.html',
  styleUrls: ['./clinic-add.component.css']
})
export class ClinicAddComponent implements OnInit {

	clinicadd:any;
	class:any;
	message:any;

	constructor( private http: Http,private router: Router,private common: CommonServiceService) { }

	ngOnInit() {
	}

  	createAuthorizationHeader(headers: Headers) {
	    let auth = localStorage.getItem("auth");
	    headers.append('authorization', auth);
	    headers.append('Access-Control-Allow-Headers' , 'authorization');
	    headers.append('Access-Control-Allow-Headers', 'Content-Type');
  		headers.append('Access-Control-Allow-Methods', 'GET');
  		headers.append('Access-Control-Allow-Origin', '*');
	}

	clinicAdd(data) {
	    let appoinmentdata: any = {
	    	"clinic_name": data.value.clinic_name,
			"user_name": data.value.user_name,
			"email_id": data.value.email_id,
			"password" : data.value.password,
			"phone_no" : data.value.phone_no,
			"address" : data.value.address
	    };

	    const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
		this.http.post ('/api/clinic/register',appoinmentdata,headers).subscribe(
			res => {
         		this.clinicadd = res.json();
         		if (this.clinicadd.status == 'success') {
         			this.class = "alert-primary";
         			this.message = "Clinic add successfully done.";
         		} else if(this.clinicadd.status == 'failed'){
         			this.class = "alert-danger";
         			this.message = "Oops ! Somthing wrong in clinic add.";
         		}
      		},
			error => {
				console.log('error : '+JSON.stringify(error));
			}
		)


	}

}
