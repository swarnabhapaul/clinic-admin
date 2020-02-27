import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';



@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  doctorlists:any = '';
  role:any;
  clinic_id:any;
  
  constructor( private http: Http,private router: Router,private common: CommonServiceService) {

  }

  ngOnInit() {
    
    this.role = localStorage.getItem("role");
    this.clinic_id = localStorage.getItem("clinic_id");

    /*===============================*/
    this.common.getDoctorlist(this.clinic_id).subscribe(
        res => {
           this.doctorlists = res.json().result;
        }
    );
    /*===============================*/
  }

}