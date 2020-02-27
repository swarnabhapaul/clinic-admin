import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

	clinic_name:any;
	c_id:any;
	profileimage:any;
	activeurl:any;
  	active2ndurl:any;
  	clinic_id:any;

	constructor(private http: Http) { 

	}

	ngOnInit() {
		var pageURL = window.location.href;
		this.clinic_id = '';
	    this.clinic_id = localStorage.getItem("clinic_id");
	    
		this.activeurl =pageURL.substr(pageURL.lastIndexOf('/') + 1);
		this.getProfileimage(this.c_id);
	}


	createAuthorizationHeader(headers: Headers) {
	  let auth = localStorage.getItem("auth");
	  headers.append('authorization', auth);
	  headers.append('Access-Control-Allow-Headers' , 'authorization');
	  headers.append('Access-Control-Allow-Headers', 'Content-Type');
	  headers.append('Access-Control-Allow-Methods', 'GET');
	  headers.append('Access-Control-Allow-Origin', '*');
	}

	getProfileimage(c_id) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/profilepicupload/profilepicuploadlist?user_id="+c_id;
		let search = new URLSearchParams();
		return this.http.get(url,{headers: headers});
	}

	getDoctorlist(clinic_id:void) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/doctor/list?clinic_id="+clinic_id;
		let search = new URLSearchParams();
		return this.http.get(url,{headers: headers});
	}

	getPatientlist(clinic_id:void) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/receptionist/list-patient?clinic_id="+clinic_id;
		let search = new URLSearchParams();
		return this.http.get(url,{headers: headers});
	}


	getReceptionistlist(clinic_id:void) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/receptionist/list?clinic_id="+clinic_id;
		let search = new URLSearchParams();
		return this.http.get(url,{headers: headers});
	}


	checkEmail(email_id,role,clinic_id:void) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/user/checkemail?email_id="+email_id+"&role="+role+"&clinic_id="+clinic_id;
		let search = new URLSearchParams();
		return this.http.get(url,{headers: headers});
	}

	checkUsername(user_name,role,clinic_id:void) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/user/checkusername?user_name="+user_name+"&role="+role+"&clinic_id="+clinic_id;
		let search = new URLSearchParams();
		return this.http.get(url,{headers: headers});
	}

	newPrn(clinic_id:void) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/patient/newprn?clinic_id="+clinic_id;
		let search = new URLSearchParams();
		return this.http.get(url,{headers: headers});
	}

	newToken(clinic_id:void) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/patient/newtoken?clinic_id="+clinic_id;
		let search = new URLSearchParams();
		return this.http.get(url,{headers: headers});
	}

}
