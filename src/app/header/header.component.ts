import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	clinic_name:any;
	user_name:any;
	c_id:any;
	auth:any;
	pfimage:string = "/assets/image/img.jpg";;
	role:any;

	constructor( private http: Http,private router: Router,private common: CommonServiceService) {

	}

	ngOnInit() {
	  	this.clinic_name = localStorage.getItem("clinic_name");
	  	this.user_name = localStorage.getItem("user_name");
	  	this.c_id = localStorage.getItem("c_id");
	  	this.auth = localStorage.getItem("auth");
	  	this.role = localStorage.getItem("role");
	  	this.common.getProfileimage(this.c_id).subscribe(
			res => {
			  if(res.json().result[0].image){
			    this.pfimage = 'http://10.10.10.145:3005'+res.json().result[0].image; 
			  }
			}
		);

	  	this.checklogin(this.auth);
	}

	checklogin(auth){
		if ( this.auth ) {
		  	return true;
		} else{
			this.router.navigate(['login']);
			return false;
		}
	}

	logout(){
		localStorage.clear();
		this.router.navigate(['login']);
	}

}
