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
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {
	
	doctoradd:any;
	class:any;
	message:any;
	doctoremail:any ='0';
	doctorusername:any ='0';
	doctordata: any;

	constructor( private http: Http,private router: Router,private common: CommonServiceService) {

	}

	ngOnInit() {
		let c_id = localStorage.getItem("c_id");
	}

  	createAuthorizationHeader(headers: Headers) {
	    headers.append('Access-Control-Allow-Headers', 'Content-Type');
  		headers.append('Access-Control-Allow-Methods', 'GET');
  		headers.append('Access-Control-Allow-Origin', '*');
	}

	doctorAdd(data) {

		if (data.value.password) {
			this.doctordata = {
		    	"first_name": 'Dr '+data.value.first_name,
				"last_name": data.value.last_name,
				"user_name": data.value.user_name,
				"password": data.value.password,
				"email_id": data.value.email_id,
				"phone_no": data.value.phone_no,
				"address": data.value.address,
				"gender": data.value.gender,
				"date_of_birth": data.value.date_of_birth,
				"degree": data.value.degree,
				"specialization": data.value.specialization,
				"experience": data.value.experience,
				"reg_no": data.value.reg_no,
				"clinic_id": localStorage.getItem("clinic_id")
		    };
		} else{
		    this.doctordata = {
		    	"first_name": 'Dr '+data.value.first_name,
				"last_name": data.value.last_name,
				"user_name": data.value.user_name,
				"email_id": data.value.email_id,
				"phone_no": data.value.phone_no,
				"address": data.value.address,
				"gender": data.value.gender,
				"date_of_birth": data.value.date_of_birth,
				"degree": data.value.degree,
				"specialization": data.value.specialization,
				"experience": data.value.experience,
				"reg_no": data.value.reg_no,
				"clinic_id": localStorage.getItem("clinic_id")
		    };
		}

	    const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
		this.http.post ('/api/doctor/register',this.doctordata,headers).subscribe(
			res => {
         		this.doctoradd = res.json();
         		if (this.doctoradd.status == 'success') {
         			this.class = "alert-primary";
         			this.message = "Doctor add successfully done.";

         		} else if(this.doctoradd.status == 'failed'){

         			this.class = "alert-danger";
         			this.message = "Oops ! Somthing wrong in doctor add.";

         		}
         		
      		},
			error => {
				console.log('error : '+JSON.stringify(error));
			}
		)
	}

	checkEmail(event: any): void {
		if(event.target.value.length > 6){
			this.common.checkEmail(event.target.value,'doctor').subscribe(
		      	res => {
		     		if (res.json().status == 'success') {
		     			this.doctoremail = '1';
		     		} else if(res.json().status == 'failed'){
		     			this.doctoremail = '2';
		     			$("#addbtn").attr("disabled","true");
		     		}else{
		     			this.doctoremail = '0';
		     		}
		  		}
			);
		}
	}
	
	checkUsername(event: any): void {
		if(event.target.value.length > 3){
			this.common.checkUsername(event.target.value,'doctor').subscribe(
		      	res => {
		     		if (res.json().status == 'success') {
		     			this.doctorusername = '1';
		     		} else if(res.json().status == 'failed'){
		     			this.doctorusername = '2';
		     			$("#addbtn").attr("disabled","true");
		     		}else{
		     			this.doctorusername = '0';
		     		}
		  		}
			);
		}
	}

}
