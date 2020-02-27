import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

 	patientbyid:any;
	patientstat:any;
	class:any;
	message:any;
	dob:any;

  	constructor( private http: Http,private router: Router) {

	}

	createAuthorizationHeader(headers: Headers) {
	    let auth = localStorage.getItem("auth");
	    headers.append('authorization', auth);
	    headers.append('Access-Control-Allow-Headers' , 'authorization');
	    headers.append('Access-Control-Allow-Headers', 'Content-Type');
  		headers.append('Access-Control-Allow-Methods', 'GET');
  		headers.append('Access-Control-Allow-Origin', '*');
	}

	ngOnInit() {

		var str = this.router.url;
		var strArr = str.split('/');
		var editId = strArr[2];
		console.log(editId);
		this.getpatientbyid(editId);
	}

  	getpatientbyid(editId: any) {

      	let headers = new Headers();
        this.createAuthorizationHeader(headers);

        let url = "/api/receptionist/list-patient?id="+editId;
        const result = this.http.get(url,{headers: headers}).subscribe((res) =>{
        	this.patientstat = res.json();
			this.patientbyid = res.json().result[0];
			var momentDate = moment(this.patientbyid.date_of_birth);
			this.dob = momentDate.format("YYYY-MM-DD");
        },
		error => {
			console.log('error : '+JSON.stringify(error));
		});
    
    }


    patientEdit(data:any){

	    let headers = new Headers();
        this.createAuthorizationHeader(headers);

        let url = "/api/patient/update";
        const result = this.http.put(url,data.value,{headers: headers}).subscribe((res) =>{
        	this.patientstat = res.json();
			if (this.patientstat.status == 'success') {
       			this.class = "alert-primary";
       			this.message = "Patient edit successfully done.";
     		  } else if(this.patientstat.status == 'failed'){
       			this.class = "alert-danger";
       			this.message = "Oops ! Somthing wrong in patient edit.";
       		}
        },
		error => {
			console.log('error : '+JSON.stringify(error));
		});
    }

}
