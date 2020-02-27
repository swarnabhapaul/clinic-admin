import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-appoinment-list',
  templateUrl: './appoinment-list.component.html',
  styleUrls: ['./appoinment-list.component.css']
})
export class AppoinmentListComponent implements OnInit {

	appoinmentlists:any;
	appointment_date:any;
	clinic_id:any;
	modalId:any;

	constructor( private http: Http,private router: Router) {

	}

	ngOnInit() {
		this.clinic_id = localStorage.getItem("clinic_id");
		this.getappoinment(this.clinic_id);
		this.modalId = document.getElementById('reportModal');
	}

	createAuthorizationHeader(headers: Headers) {
	    let auth = localStorage.getItem("auth");
	    headers.append('authorization', auth);
	    headers.append('Access-Control-Allow-Headers' , 'authorization');
	    headers.append('Access-Control-Allow-Headers', 'Content-Type');
  		headers.append('Access-Control-Allow-Methods', 'GET');
  		headers.append('Access-Control-Allow-Origin', '*');
	}

	getappoinment(clinic_id) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/appointment/appointmentlist?clinic_id="+clinic_id;
		let search = new URLSearchParams();
		this.http.get(url,{headers: headers}).subscribe(
			res => {
		 		this.appoinmentlists = res.json().result;
		 		console.log(this.appoinmentlists);
			}
		);
	}

	
    openModal(id: string) {
		var element = document.getElementById("reportModal");
		element.classList.add("openmodal");
		element.classList.remove("fade");
    }

    closeModal() {
        var element = document.getElementById("reportModal");
  		element.classList.remove("openmodal");
  		element.classList.add("fade");
    }

}
