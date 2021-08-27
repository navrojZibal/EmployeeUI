import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  error = false;
  loginForm = new FormGroup({
    userName:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  });
  constructor(public service:EmployeeService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm;
  }
  logIn(){
    this.service.login(this.loginForm.value)
    .subscribe(
      (res:any) => {
          console.log(res)
          localStorage.setItem('token',res.token),
          localStorage.setItem('username',res.username),
          this.router.navigate(['/home'])
      },
      err => {
        if(err.status == 403){
          this.error = true;
        }
      }
    );
  }

  get f(){
    return this.loginForm.controls;
  }

}
