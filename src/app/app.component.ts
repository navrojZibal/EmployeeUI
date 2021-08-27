import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeData } from './dataFolder/data';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  name:string = "";
  
  constructor(public service:EmployeeService,private dialog:MatDialog){}
  ngOnInit(): void {
     this.name = localStorage.getItem('username')!.toUpperCase();
  }
  openProfile(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width='40%';
    dialogConfig.height='40%';
    this.dialog.open(ProfileComponent,dialogConfig);
  }
}
