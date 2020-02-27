import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

	prescriptionlists:any;
	myDate:any;
	clinic_phone_no:any;
	clinic_email_id:any;
	clinic_name:any;
	clinic_address:any;
	clinic_estab:any;

  	constructor( private http: Http,private router: Router) { }

  	ngOnInit() {
  		var str = this.router.url;
		var strArr = str.split('/');
		var editId = strArr[2];
		this.myDate = new Date();
		this.clinic_phone_no = localStorage.getItem("clinic_phone_no");
		this.clinic_email_id = localStorage.getItem("clinic_email_id");
		this.clinic_name = localStorage.getItem("clinic_name");
		this.clinic_address = localStorage.getItem("clinic_address");
		this.clinic_estab = localStorage.getItem("clinic_estab");
		this.getPrescription(editId);
	}

	createAuthorizationHeader(headers: Headers) {
	    let auth = localStorage.getItem("auth");
	    headers.append('authorization', auth);
	    headers.append('Access-Control-Allow-Headers' , 'authorization');
	    headers.append('Access-Control-Allow-Headers', 'Content-Type');
  		headers.append('Access-Control-Allow-Methods', 'GET');
  		headers.append('Access-Control-Allow-Origin', '*');
	}

	getAge(dateString) {
	    var today = new Date();
	    var birthDate = new Date(dateString);
	    var age = today.getFullYear() - birthDate.getFullYear();
	    var m = today.getMonth() - birthDate.getMonth();
	    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	        age--;
	    }
	    return age;
	}

	getPrescription(editId: any) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/appointment/appointmentlist?_id="+editId;
		let search = new URLSearchParams();
		this.http.get(url,{headers: headers}).subscribe(
			res => {
		 		this.prescriptionlists = res.json().result[0];
		 		console.log(this.prescriptionlists.doctordetails);
			}
		);
	}

}
