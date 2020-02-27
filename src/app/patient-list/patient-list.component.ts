import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patientlists:any;
  clinic_id:any;

  constructor( private http: Http,private router: Router,private common: CommonServiceService) {

  }

	ngOnInit() {
		this.clinic_id = localStorage.getItem("clinic_id");
		/*===============================*/
	    this.common.getPatientlist(this.clinic_id).subscribe(
	      	(res) => {
	      		this.patientlists = res.json().result;
			}
	    );
	    /*===============================*/
	}

}
