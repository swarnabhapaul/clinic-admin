import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-appoinment-add',
  templateUrl: './appoinment-add.component.html',
  styleUrls: ['./appoinment-add.component.css']
})
export class AppoinmentAddComponent implements OnInit {

  	appoinmentadd:any;
	class:any;
	message:any;
	doctorlists:any;
	patientlists:any;
	receptionistlists:any;
	ganaretedToken:any;

	constructor( private http: Http,private router: Router,private common: CommonServiceService) {

	}

	ngOnInit() {
		let c_id = localStorage.getItem("c_id");
		/*===============================*/
	    this.common.getDoctorlist().subscribe(
	      	res => {
         		this.doctorlists = res.json().result;
      		}
	    );
	    /*===============================*/
	    this.common.getPatientlist().subscribe(
	      	(res) => {
	      		this.patientlists = res.json().result;
			}
	    );
	    /*===============================*/
	    this.common.getReceptionistlist().subscribe(
	      	(res) => {
	      		this.receptionistlists = res.json().result;
			}
	    );
	    /*==============================*/
	    this.newToken();
	}

  	createAuthorizationHeader(headers: Headers) {
	    let auth = localStorage.getItem("auth");
	    headers.append('authorization', auth);
	    headers.append('Access-Control-Allow-Headers' , 'authorization');
	    headers.append('Access-Control-Allow-Headers', 'Content-Type');
  		headers.append('Access-Control-Allow-Methods', 'GET');
  		headers.append('Access-Control-Allow-Origin', '*');
	}

	appoinmentAdd(data) {
	    let appoinmentdata: any = {
	    	"prn": data.value.prnlist,
			"r_id": data.value.receplist,
			"d_id": data.value.doctorlist,
			"appointment_date" : data.value.appointment_date,
			"appointment_time" : data.value.appointment_time,
			"app_token" : data.value.app_token,
			"status" : "0",
			"comment" : "Nothing",
			"blood_pressure" : data.value.blood_pressure,
			"weight" : data.value.weight,
			"height" : data.value.height,
			"c_id" : localStorage.getItem("clinic_id")
	    };

	    const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
		this.http.post ('/api/appointment/addappointment',appoinmentdata,headers).subscribe(
			res => {
         		this.appoinmentadd = res.json();
         		if (this.appoinmentadd.status == 'success') {
         			this.class = "alert-primary";
         			this.message = "Appointment add successfully done.";
         		} else if(this.appoinmentadd.status == 'failed'){
         			this.class = "alert-danger";
         			this.message = "Oops ! Somthing wrong in appointment add.";
         		}
      		},
			error => {
				console.log('error : '+JSON.stringify(error));
			}
		)
	}

	newToken() {
		this.common.newToken().subscribe(
	      	res => {
	     		if (res.json().status == 'success') {
	     			this.ganaretedToken = res.json().result.new_app_token;
	     		}
	  		}
		);
	}

}
