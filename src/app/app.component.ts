import { Component } from '@angular/core';
import * as mime from 'mime-types';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinic-admin-app';

  	constructor( private http: Http,private router: Router) {

  	}

  	ngOnInit() {
  		var auth = localStorage.getItem("auth");
      var pageURL = window.location.href;
      var activeurl =pageURL.substr(pageURL.lastIndexOf('/') + 1);
  		if (!auth) {
        if(activeurl == 'forgot-password'){
  		  	this.router.navigate(['forgot-password']);
        } else {
          this.router.navigate(['login']);
        }
  		} 
  	}

}
