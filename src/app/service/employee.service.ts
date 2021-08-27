import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeData } from '../dataFolder/data';


import { Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { registerData } from '../dataFolder/register';
import { loginData } from '../dataFolder/login';
import { NotificationService } from './notification.service';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = "http://localhost:8080/"
  
  constructor(private http:HttpClient ,private router:Router,private dialog:MatDialog) { }

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstname: new FormControl('', Validators.required),
    lastname:new FormControl(''),
    salary: new FormControl(''),
    designation: new FormControl('',Validators.required),
    gender: new FormControl('Male'),
    dob: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  openConfirmDialog(){
    return this.dialog.open(ConfirmDialogComponent,{
      width:'390px',
      panelClass:'confirm-dialog-container',
      disableClose:true
    });
  }
  
  login(data:loginData){
    return this.http.post(this.url+"token/login",data) 
  }
  
  register(data:registerData){
    return this.http.post<registerData>(this.url+"register",data);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  public getHeader() {
    let authorizationString = "Bearer " + localStorage.getItem('token');
    const httpOptions = {
        headers: new HttpHeaders({
            'Authorization': authorizationString
        })
    };
    return httpOptions;
  }
  
  getData(){
    return this.http.get(this.url+"employee",this.getHeader());
  }

  getImage(id:string){
    return this.http.get(this.url+"get/"+id,this.getHeader());
  }

  postImage(id:string,image:any){
    return this.http.post(this.url+"upload/"+id,image,this.getHeader());
  }

  postData(data:EmployeeData){
    return this.http.post(this.url+"employee",data,this.getHeader());
  }

  editData(data:EmployeeData,id:string){
    return this.http.put(this.url+"employee/"+id,data,this.getHeader());
  }
  
  onEditForm(employee:EmployeeData){
    this.employeeForm.setValue(employee);
  }

  onDetailForm(employee:EmployeeData){
    this.employeeForm.setValue(employee);
  }

  deleteData(id:string){
    return this.http.delete(this.url+"employee/"+id,this.getHeader());
  }

  onReferesh(){
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}
