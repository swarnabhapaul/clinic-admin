import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnInit {
 
    cliniclists:any;
    constructor(private http: Http,private router: Router) { }

    ngOnInit() {
		this.getclinic();
	}

	createAuthorizationHeader(headers: Headers) {
	    let auth = localStorage.getItem("auth");
	    headers.append('authorization', auth);
	    headers.append('Access-Control-Allow-Headers' , 'authorization');
	    headers.append('Access-Control-Allow-Headers', 'Content-Type');
  		headers.append('Access-Control-Allow-Methods', 'GET');
  		headers.append('Access-Control-Allow-Origin', '*');
	}

	getclinic() {

		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let url = "/api/clinic/list";
		let search = new URLSearchParams();
		this.http.get(url,{headers: headers}).subscribe(
			res => {
		 		this.cliniclists = res.json().result;
			}
		);
	}

}
