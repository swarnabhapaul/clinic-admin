import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-receptionst-edit',
  templateUrl: './receptionst-edit.component.html',
  styleUrls: ['./receptionst-edit.component.css']
})
export class ReceptionstEditComponent implements OnInit {

	receptionstbyid:any;
	receptionststat:any;
	class:any;
	message:any;
	receptionstedit:any;

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
		this.getReceptionstbyid(editId);
	}

  	getReceptionstbyid(editId: any) {

      let headers = new Headers();
        this.createAuthorizationHeader(headers);

        let url = "/api/receptionist/list?id="+editId;
        const result = this.http.get(url,{headers: headers}).subscribe((res) =>{
        	this.receptionststat = res.json();
			this.receptionstbyid = res.json().result[0];
        },
		error => {
			console.log('error : '+JSON.stringify(error));
		});
    
    }


    receptionstEdit(data:any){
    	  let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let url = "/api/receptionist/update";
        const result = this.http.put(url,data.value,{headers: headers}).subscribe((res) =>{
        	this.receptionstedit = res.json();
        	if (this.receptionstedit.status == 'success') {
       			this.class = "alert-primary";
       			this.message = "Receptionist edit successfully done.";
     		  } else if(this.receptionstedit.status == 'failed'){
       			this.class = "alert-danger";
       			this.message = "Oops ! Somthing wrong in receptionist edit.";
       		}
        },
		error => {
			console.log('error : '+JSON.stringify(error));
		});
    }

}
