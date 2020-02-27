import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-superadmin-profile',
  templateUrl: './superadmin-profile.component.html',
  styleUrls: ['./superadmin-profile.component.css']
})
export class SuperadminProfileComponent implements OnInit {

	superadminbyid:any;
	superadminstat:any;
	class:any;
	message:any;
	profileclass:any;
	profilemessage:any;
	superadminedit:any;
	clinicdata: any;
	profilepic: any;
	getprofilepic: any;
	profileimage: any = "/assets/image/img.jpg";
	flag:any = 0;
	id:any;
	url:any;


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
		this.id = localStorage.getItem("c_id");
	    this.getsuperadminbyid(this.id);
	    this.getprofilepicbyid(this.id);
	    this.url = "http://10.10.10.145:3005";
	}

  	getsuperadminbyid(editId: any) {

      	let headers = new Headers();
        this.createAuthorizationHeader(headers);

        let url = "/api/superadmin/list?id="+editId;
        const result = this.http.get(url,{headers: headers}).subscribe((res) =>{
        	this.superadminstat = res.json();
			this.superadminbyid = res.json().result[0];
        },
		error => {
			console.log('error : '+JSON.stringify(error));
		});
    
    }

	superadminEdit(data:any){
    	let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let url = "/api/superadmin/update";

        if (data.value.password !== '') {
        	this.clinicdata = {
	    		"first_name": data.value.first_name,
				"last_name": data.value.last_name,
				"user_name": data.value.user_name,
				"password": data.value.password,
				"email_id": data.value.email_id,
				"phone_no": data.value.phone_no,
				"address": data.value.address
		    };
        }else{
        	this.clinicdata = {
	    		"first_name": data.value.first_name,
				"last_name": data.value.last_name,
				"user_name": data.value.user_name,
				"email_id": data.value.email_id,
				"phone_no": data.value.phone_no,
				"address": data.value.address
		    };
        }
        

        const result = this.http.put(url,this.clinicdata,{headers: headers}).subscribe((res) =>{
        	this.superadminedit = res.json();
        	if (this.superadminedit.status == 'success') {
       			this.class = "alert-primary";
       			this.message = "superadmin edit successfully done.";
     		} else if(this.superadminedit.status == 'failed'){
       			this.class = "alert-danger";
       			this.message = "Oops ! Somthing wrong in superadmin edit.";
       		}
        },
		error => {
			console.log('error : '+JSON.stringify(error));
		});
    }


    /*=================  Profile Upload ===================*/

    getprofilepicbyid(id: any) {

      	let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let url = "/api/profilepicupload/profilepicuploadlist?user_id="+id;
        const result = this.http.get(url,{headers: headers}).subscribe((res) =>{
			if(res.json().result[0].image){
	          this.profileimage = this.url+res.json().result[0].image; 
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
		
		this.profilepic = {
		  "user_id" : this.id,
		  "image" : this.imageSrc
		}	
		console.log(this.flag+"<<<---------->>>"+this.profilepic);
		
		if(this.flag == 0){
			const headers:any = new HttpHeaders({ 'Content-Type': 'application/json' });
			this.http.post ('/api/profilepicupload/addprofilepicupload',this.profilepic,headers).subscribe(
				res => {
	         		this.getprofilepic = res.json();
	         		if (this.getprofilepic.status == 'success') {
	         			this.profileimage = this.url+res.json().result.image;
	         			this.profileclass = "active";
	         			this.profilemessage = "Profile picture changed.";
	         		} else if(this.getprofilepic.status == 'failed'){
	         			this.profileclass = "";
	         			this.profilemessage = "Oops ! Somthing wrong in profile picture changed.";
	         		}
	      		},
				error => {
					console.log('error : '+JSON.stringify(error));
				}
			)
		} else if(this.flag == 1){

			let headers = new Headers();
	        this.createAuthorizationHeader(headers);
	        let url = '/api/profilepicupload/updateprofilepicupload';
	        const result = this.http.put(url,this.profilepic,{headers: headers}).subscribe((res) =>{
	         		this.getprofilepic = res.json();
	         		if (this.getprofilepic.status == 'success') {
	         			this.profileimage = this.url+res.json().result.image;
	         			this.profileclass = "active";
	         			this.profilemessage = "Profile picture changed.";
	         		} else if(this.getprofilepic.status == 'failed'){
	         			this.profileclass = "";
	         			this.profilemessage = "Oops ! Somthing wrong in profile picture changed.";
	         		}
	      		},
				error => {
					console.log('error : '+JSON.stringify(error));
				}
			)
		}
		
	}
	/*=================  Profile Upload ===================*/

}
