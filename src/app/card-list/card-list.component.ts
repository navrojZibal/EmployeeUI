import { Component, Input, OnInit } from '@angular/core';
import { EmployeeData } from '../dataFolder/data';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  employee:EmployeeData[] = [];
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: string;
  constructor(private service:EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getImage();
  }
  public getEmployees(){
    this.service.getData()
    .subscribe(res => {
      this.employee = res as EmployeeData[] ;
      console.log(res);
    });
  }
  
  getImage() {
    
    this.service.getImage(this.service.employeeForm.value.id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
