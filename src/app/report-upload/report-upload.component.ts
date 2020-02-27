import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-report-upload',
  templateUrl: './report-upload.component.html',
  styleUrls: ['./report-upload.component.css']
})
export class ReportUploadComponent implements OnInit {

	reportdata:any;
	reportadd:any;
	class:any;
	message:any;
	appo_id:any;
	numberone:any;
	numbertwo:any;
	numberthree:any;
	reportlists:any;
	url:any;
	flag:any = 0;

	constructor( private http: Http,private router: Router,private common: CommonServiceService) {

	}

	ngOnInit() {
		this.imageSrc = '';
		var currentUrl = this.router.url;
		this.appo_id = currentUrl.substr(currentUrl.lastIndexOf('/') + 1);
		var str = this.router.url;
		var strArr = str.split('/');
		var editId = strArr[2];
		this.getreportbyappoid(editId);
		this.url = "http://10.10.10.145:3005";

	}


	createAuthorizationHeader(headers: Headers) {
	    let auth = localStorage.getItem("auth");
	    headers.append('authorization', auth);
	    headers.append('Access-Control-Allow-Headers' , 'authorization');
	    headers.append('Access-Control-Allow-Headers', 'Content-Type');
  		headers.append('Access-Control-Allow-Methods', 'GET');
  		headers.append('Access-Control-Allow-Origin', '*');
	}

	getreportbyappoid(editId: any) {

      	let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let url = "/api/report/reportlist?appointment_id="+editId;
        const result = this.http.get(url,{headers: headers}).subscribe((res) =>{
    		//this.reportlists = res.json();
			this.reportlists = res.json().result;
			if (this.reportlists[0]) {
				this.flag = 1;
			}
        },
		error => {
			console.log('error : '+JSON.stringify(error));
		});
    
    }

  	private imageSrc: string = '';

	handleInputChange(e) {
		var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
		var pattern = /image-*/;
		var reader = new FileReader();
		if (!file.type.match(pattern)) {
		  alert('invalid format');
		  return;
		}
		reader.onload = this._handleReaderLoaded.bind(this);
		reader.readAsDataURL(file);
	}
	_handleReaderLoaded(e) {
		let reader = e.target;
		this.imageSrc = reader.result;
		

		this.reportdata = {
			"appointment_id": this.appo_id,
			"image": this.imageSrc
	    };
	    const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
		this.http.post ('/api/report/addreport',this.reportdata,headers).subscribe(
			res => {
         		this.reportadd = res.json();
         		console.log(this.reportadd.status);
         		if (this.reportadd.status == 'success') {
         			this.class = "alert-warning";
         			this.message = "Report added successfully done.";
         			//setTimeout(function(){ 
         				//this.router.navigate(['login']); 
         				//window.location.href = '/login';
         			//}, 1000);
         		} else if(this.reportadd.status == 'failed'){
         			this.class = "alert-danger";
         			this.message = "Oops ! Somthing wrong in report add.";
         		}
      		},
			error => {	
				console.log('error : '+JSON.stringify(error));
				this.class = "alert-danger";
         		this.message = "Oops ! Somthing wrong in report add.";
			}
		)
	}

}
