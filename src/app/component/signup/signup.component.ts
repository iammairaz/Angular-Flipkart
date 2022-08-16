import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;

}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {


  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http:HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname : [''],
      email : [''],
      password : [''],
      phone : [''],
      returnSecureToken : true
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
    .subscribe(res=>{
      alert("Signup Successfull");
      console.log("signup successfull",res);
      this.signupForm.reset();
      this.router.navigate(['login']);
    }, err=>{
      alert("Something Went wrong");
      console.log(err);
    })
  }
/*   signUp(){
    this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,this.signupForm.value)
    .subscribe(res=>{
      alert("Signup Successfull");
      console.log(res);
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Someting went wrong");
    })
  } */
}
