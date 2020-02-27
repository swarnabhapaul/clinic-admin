import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

	patientadd:any;
	class:any;
	message:any;
	patientemail:any ='0';
	patientusername:any ='0';
	patientdata: any;
	ganaretedprn:any;
	clinic_id:any;

	constructor( private http: Http,private router: Router,private common: CommonServiceService) {

	}

	ngOnInit() {
		this.clinic_id = localStorage.getItem("clinic_id");
		this.newPrn(this.clinic_id);
	}

  	createAuthorizationHeader(headers: Headers) {
	    headers.append('Access-Control-Allow-Headers', 'Content-Type');
  		headers.append('Access-Control-Allow-Methods', 'GET');
  		headers.append('Access-Control-Allow-Origin', '*');
	}

	patientAdd(data) {
		if (data.value.password) {
			this.patientdata = {
		    	"prn": data.value.prn,
		    	"first_name": data.value.first_name,
				"last_name": data.value.last_name,
				"user_name": data.value.user_name,
				"password": data.value.password,
				"email_id": data.value.email_id,
				"phone_no": data.value.phone_no,
				"address": data.value.address,
				"gender": data.value.gender,
				"date_of_birth": data.value.date_of_birth,
				"clinic_id": localStorage.getItem("clinic_id")
		    };
		}else{
			this.patientdata = {
		    	"prn": data.value.prn,
		    	"first_name": data.value.first_name,
				"last_name": data.value.last_name,
				"user_name": data.value.user_name,
				"email_id": data.value.email_id,
				"phone_no": data.value.phone_no,
				"address": data.value.address,
				"gender": data.value.gender,
				"date_of_birth": data.value.date_of_birth,
				"clinic_id": localStorage.getItem("clinic_id")
		    };
		}
	    

	    const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
		this.http.post ('/api/patient/register',this.patientdata,headers).subscribe(
			res => {
         		this.patientadd = res.json();
         		if (this.patientadd.status == 'success') {
         			this.class = "alert-primary";
         			this.message = "Patient add successfully done.";

         		} else if(this.patientadd.status == 'failed'){

         			this.class = "alert-danger";
         			this.message = "Oops ! Somthing wrong in patient add.";

         		}
         		
      		},
			error => {
				console.log('error : '+JSON.stringify(error));
			}
		)
	}

	checkEmail(event: any): void {
		if(event.target.value.length > 6){
			this.common.checkEmail(event.target.value,'patient',this.clinic_id).subscribe(
		      	res => {
		     		if (res.json().status == 'success') {
		     			this.patientemail = '1';
		     		} else if(res.json().status == 'failed'){
		     			this.patientemail = '2';
		     		}else{
		     			this.patientemail = '0';
		     		}
		  		}
			);
		}
	}
	
	checkUsername(event: any): void {
		if(event.target.value.length > 3){
			this.common.checkUsername(event.target.value,'patient',this.clinic_id).subscribe(
		      	res => {
		     		if (res.json().status == 'success') {
		     			this.patientusername = '1';
		     		} else if(res.json().status == 'failed'){
		     			this.patientusername = '2';
		     		}else{
		     			this.patientusername = '0';
		     		}
		  		}
			);
		}
	}


	newPrn(clinic_id) {
		this.common.newPrn(clinic_id).subscribe(
	      	res => {
	     		if (res.json().status == 'success') {
	     			this.ganaretedprn = res.json().result.prn;
	     			console.log("Ganareted prn"+this.ganaretedprn);
	     		}
	  		}
		);
	}

}
