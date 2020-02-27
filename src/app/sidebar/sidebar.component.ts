import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  clinic_name:any;
  c_id:any;
  activeurl:any;
  active2ndurl:any;
  pfimage:any = "/assets/image/img.jpg";
  role:any;

  constructor( private http: Http,private router: Router,private sanitizer: DomSanitizer,private common: CommonServiceService) {

  }

  ngOnInit() {
  	this.clinic_name = localStorage.getItem("clinic_name");
  	this.c_id = localStorage.getItem("c_id");
    this.role = localStorage.getItem("role");
    var pageURL = window.location.href;
    this.activeurl =pageURL.substr(pageURL.lastIndexOf('/') + 1);

    /*===============================*/
    this.common.getProfileimage(this.c_id).subscribe(
      res => {
        if(res.json().result[0].image){
          this.pfimage = 'http://10.10.10.145:3005'+res.json().result[0].image; 
        }
      }
    );
    /*===============================*/

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
