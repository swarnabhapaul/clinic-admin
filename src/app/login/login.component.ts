import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	message:any;
	class:any;
	clinicbyid:any;
	loginurl:any = '';
	result:any;

  	constructor( private http: Http,private router: Router) {

  	}

	ngOnInit() {

		var auth = localStorage.getItem("auth");
		if (!auth) {
		  	this.router.navigate(['login']);
		} else{
		  	this.router.navigate(['dashboard']);
		}
		
	}

	createAuthorizationHeader(headers: Headers) {
	    headers.append('Access-Control-Allow-Headers' , 'authorization');
	    headers.append('Access-Control-Allow-Headers', 'Content-Type');
  		headers.append('Access-Control-Allow-Methods', 'GET');
  		headers.append('Access-Control-Allow-Origin', '*');
	}
	

	adminLogin(data) {

		let self = this;

	    let insertdata: any = {
	        "user_name": data.value.lusername,
	        "password" : data.value.lpassword,
	        "role" : data.value.typeofuser
	    };

	    let headers = new Headers();
		this.createAuthorizationHeader(headers);

		

		if (data.value.typeofuser == 'clinic') {
			this.loginurl = environment.apiUrl+'/api/clinic/login';
		}else{
			this.loginurl = environment.apiUrl+'/api/user/login';
		}
	 
		this.http.post (this.loginurl,insertdata,{headers: headers}).subscribe(res => {

			var data = res.json();
			if(data.status == "failed"){
				this.message = data.message;
				this.class = "btn-denger";
			} else if(data.status == "success"){				
				this.result = data.result;
				var auth = data.auth;
				localStorage.setItem('role', this.result.role);
				localStorage.setItem("c_id",this.result._id);
				localStorage.setItem("user_name",this.result.user_name);
				localStorage.setItem("email_id",this.result.email_id);
				localStorage.setItem('auth', auth);

				if (this.result.role == 'clinic') {
					localStorage.setItem('clinic_id', this.result._id);
					localStorage.setItem('clinic_name', this.result.clinic_name);
					localStorage.setItem('clinic_email_id', this.result.email_id);
					localStorage.setItem('clinic_phone_no', this.result.phone_no);
					localStorage.setItem('clinic_address', this.result.address);
					localStorage.setItem('clinic_estab', this.result.clinic_estab);
				} else if(this.result.role == 'receptionist'){
					localStorage.setItem('clinic_id', this.result.clinic_id);
					localStorage.setItem('clinic_name', this.result.clinicdetails.clinic_name);
					localStorage.setItem('clinic_email_id', this.result.clinicdetails.email_id);
					localStorage.setItem('clinic_phone_no', this.result.clinicdetails.phone_no);
					localStorage.setItem('clinic_address', this.result.clinicdetails.address);
					localStorage.setItem('clinic_estab', this.result.clinicdetails.clinic_estab);
				}
				self.router.navigate(['/dashboard/']);

			}else{
				this.message = "Oop, somthing wrong.";
				this.class = "btn-denger";
			}
				
		},
		error => {
			console.log('error : '+JSON.stringify(error));
		})

	}


}
