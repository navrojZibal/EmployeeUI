import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  constructor(public service:EmployeeService,private dialogRef:MatDialogRef<DetailsDialogComponent>) { }

  employeeData = []
  ngOnInit(): void {
  }
  onClose(){
    this.service.employeeForm.reset(),
    this.dialogRef.close()
  }
  

}
