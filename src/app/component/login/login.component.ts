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
  registered?: boolean;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  public isLoging = false;
  public loginForm !: FormGroup
  constructor(private formBuilder : FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email : [''],
      password : [''],
      returnSecureToken : true
    })
  }

  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      });
      if(user){
        alert("Login Successfull!!");
        this.loginForm.reset();
        this.router.navigate(['products']);
        this.isLoging = true;
      }else{
        alert("User not found!!")
      }
    },err=>{
      alert("Something went wrong");
      console.log(err)
    })
  }
/*   login(){
    this.http.get<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey)
    .subscribe(res=>{
      console.log(res);
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      });
    },err=>{
      alert("Something went wrong!!")
      console.log(err);
    })
  } */
}
