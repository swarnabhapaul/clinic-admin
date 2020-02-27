import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-receptionst-list',
  templateUrl: './receptionst-list.component.html',
  styleUrls: ['./receptionst-list.component.css']
})
export class ReceptionstListComponent implements OnInit {

  receptionstlists:any;
  clinic_id:any;

  constructor( private http: Http,private router: Router) {

  }

	ngOnInit() {
	    this.clinic_id = localStorage.getItem("clinic_id");
		this.getReceptionst(this.clinic_id);
	}

	createAuthorizationHeader(headers: Headers) {
	    let auth = localStorage.getItem("auth");
	    headers.append('authorization', auth);
	    headers.append('Access-Control-Allow-Headers' , 'authorization');
	    headers.append('Access-Control-Allow-Headers', 'Content-Type');
  		headers.append('Access-Control-Allow-Methods', 'GET');
  		headers.append('Access-Control-Allow-Origin', '*');
	}

	getReceptionst(clinic_id) {

		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/receptionist/list?clinic_id="+clinic_id;
		let search = new URLSearchParams();
		this.http.get(url,{headers: headers}).subscribe(
			res => {
		 		this.receptionstlists = res.json().result;
		 		console.log('data', res);
			}
		);
	}

}
