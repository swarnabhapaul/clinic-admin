import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {

	doctorbyid:any;
	doctorstat:any;
	class:any;
	message:any;
	doctoredit:any;

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
		this.getDoctorbyid(editId);
	}

  	getDoctorbyid(editId: any) {

      	let headers = new Headers();
        this.createAuthorizationHeader(headers);

        let url = "/api/doctor/list?id="+editId;
        const result = this.http.get(url,{headers: headers}).subscribe((res) =>{
        	this.doctorstat = res.json();
			this.doctorbyid = res.json().result[0];
        },
		error => {
			console.log('error : '+JSON.stringify(error));
		});
    
    }


    doctorEdit(data:any){
    	  let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let url = "/api/doctor/update";
        const result = this.http.put(url,data.value,{headers: headers}).subscribe((res) =>{
        	this.doctoredit = res.json();
        	if (this.doctoredit.status == 'success') {
       			this.class = "alert-primary";
       			this.message = "Doctor edit successfully done.";
     		  } else if(this.doctoredit.status == 'failed'){
       			this.class = "alert-danger";
       			this.message = "Oops ! Somthing wrong in doctor edit.";
       		}
        },
    		error => {
    			console.log('error : '+JSON.stringify(error));
    		});
    }

}
