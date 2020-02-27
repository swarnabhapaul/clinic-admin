import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-receptionst-add',
  templateUrl: './receptionst-add.component.html',
  styleUrls: ['./receptionst-add.component.css']
})
export class ReceptionstAddComponent implements OnInit {

	receptionstadd:any;
	class:any;
	message:any;
	receptionstemail:any ='0';
	receptionstusername:any ='0';
	receptionstdata: any;

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

	receptionstAdd(data) {

		if (data.value.password) {
			this.receptionstdata = {
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
			this.receptionstdata = {
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
		this.http.post ('/api/receptionist/register',this.receptionstdata,headers).subscribe(
			res => {
         		this.receptionstadd = res.json();
         		if (this.receptionstadd.status == 'success') {
         			this.class = "alert-primary";
         			this.message = "Receptionst add successfully done.";

         		} else if(this.receptionstadd.status == 'failed'){

         			this.class = "alert-danger";
         			this.message = "Oops ! Somthing wrong in receptionst add.";
         		}	
      		},
			error => {
				console.log('error : '+JSON.stringify(error));
			}
		)
	}


	checkEmail(event: any): void {
		if(event.target.value.length > 6){
			this.common.checkEmail(event.target.value,'receptionst').subscribe(
		      	res => {
		     		if (res.json().status == 'success') {
		     			this.receptionstemail = '1';
		     		} else if(res.json().status == 'failed'){
		     			this.receptionstemail = '2';
		     		}else{
		     			this.receptionstemail = '0';
		     		}
		  		}
			);
		}
	}
	
	checkUsername(event: any): void {
		if(event.target.value.length > 3){
			this.common.checkUsername(event.target.value,'receptionst').subscribe(
		      	res => {
		     		if (res.json().status == 'success') {
		     			this.receptionstusername = '1';
		     		} else if(res.json().status == 'failed'){
		     			this.receptionstusername = '2';
		     		}else{
		     			this.receptionstusername = '0';
		     		}
		  		}
			);
		}
	}

}
