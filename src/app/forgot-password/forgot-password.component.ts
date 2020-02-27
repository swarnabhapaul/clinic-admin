import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

	forgotdata:any;
	class:any;
	message:any;

  	constructor( private http: Http,private router: Router) {

  	}

	ngOnInit() {
	}

	

	adminForgot(data) {
	    let insertdata: any = {
	        "email_id": data.value.email_id,
	        "typeofuser": data.value.typeofuser
	    };

	    const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
	 
		this.http.post ('/api/clinic/forgotpassword',insertdata,headers).subscribe(res => {
				console.log('res: ' + res);
				this.forgotdata = res.json();
         		if (this.forgotdata.status == 'success') {
         			this.class = "btn-warning";
         			this.message = this.forgotdata.message;
         			/*setTimeout(function(){ 
         				this.router.navigate(['/login']);
         			}, 2000);*/

         		} else if(this.forgotdata.status == 'failed'){
         			this.message = this.forgotdata.message;
         			this.class = "alert-danger";
         		}
			},
			error => {
				console.log('error : '+JSON.stringify(error));
			}
		)

	}

}
