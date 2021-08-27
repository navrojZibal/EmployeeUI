import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  error = false;
  registerForm = new FormGroup({
    firstname:new FormControl('',Validators.required),
    lastname:new FormControl(''),
    email:new FormControl('',[Validators.email,Validators.required]),
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  });
  constructor(private employeeService:EmployeeService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm;
  }
  get f(){
    return this.registerForm.controls;
  }
  register(){
    this.employeeService.register(this.registerForm.value).subscribe(
      (res:any) => {
        
          console.log(res)
          localStorage.setItem('token',res.token)
          this.router.navigate(['/list'])
        
    },
      (err:any) =>{
        if(err.status == 403){
          this.error = true;
        }else{
          console.log(err)
        }
        
      } 
    )
  }
}

