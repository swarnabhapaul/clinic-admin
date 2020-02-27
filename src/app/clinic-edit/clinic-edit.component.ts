import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-clinic-edit',
  templateUrl: './clinic-edit.component.html',
  styleUrls: ['./clinic-edit.component.css']
})
export class ClinicEditComponent implements OnInit {

	clinicbyid:any;
	clinicstat:any;
	class:any;
	message:any;
	clinicedit:any;

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
		this.getclinicbyid(editId);
	}

  	getclinicbyid(editId: any) {

      	let headers = new Headers();
        this.createAuthorizationHeader(headers);

        let url = "/api/clinic/list?id="+editId;
        const result = this.http.get(url,{headers: headers}).subscribe((res) =>{
        	this.clinicstat = res.json();
    			this.clinicbyid = res.json().result[0];
    			console.log(this.clinicbyid);
        },
    		error => {
    			console.log('error : '+JSON.stringify(error));
    		});
    
    }


    clinicEdit(data:any){
    	let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let pass = '';
        if (data.value.password) {
        	pass = data.value.password;
        }else{
        	pass = data.value.oldpss;
        }
        let clinicUpdate = {
        	"clinic_name": data.value.clinic_name,
            "user_name": data.value.user_name,
            "email_id": data.value.email_id,
            "password": pass,
            "phone_no": data.value.phone_no,
            "address": data.value.address
        };
        let url = "/api/clinic/update";
        const result = this.http.put(url,data.value,{headers: headers}).subscribe((res) =>{
        	this.clinicedit = res.json();
        	if (this.clinicedit.status == 'success') {
       			this.class = "alert-primary";
       			this.message = "clinic edit successfully done.";
     		  } else if(this.clinicedit.status == 'failed'){
       			this.class = "alert-danger";
       			this.message = "Oops ! Somthing wrong in clinic edit.";
       		}
        },
    		error => {
    			console.log('error : '+JSON.stringify(error));
    		});
    }

}
