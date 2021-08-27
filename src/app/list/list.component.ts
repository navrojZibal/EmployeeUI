import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { EmployeeData } from '../dataFolder/data';
import { MatDialog,MatDialogConfig ,MatDialogRef} from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { NotificationService } from '../service/notification.service';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ELEMENT_DATA:EmployeeData[] = [];

  @ViewChild(MatSort) sort:MatSort;

  title = "Employee List"
  displayedColumns:string[] = ['name','designation','gender','date','salary','actions'];
  dataSource = new MatTableDataSource<EmployeeData>(this.ELEMENT_DATA);
  
  searchKey:string = "";
  constructor(public service:EmployeeService,private router:Router,
    private dialog:MatDialog
    ,private notificationService:NotificationService) { }
    
  ngOnInit(): void {
   
    this.getEmployees();
    
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  public getEmployees(){
    this.service.getData()
    .subscribe(report => {
    
      this.dataSource.data = report as EmployeeData[];
      this.dataSource.sort = this.sort;
    },
    );
  }
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='60%';
    this.dialog.open(EmployeeFormComponent,dialogConfig);
  }

  onDetail(row:EmployeeData){
    this.service.onDetailForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='60%';
    this.dialog.open(DetailsDialogComponent,dialogConfig);
  }

  onEdit(row:EmployeeData){
    this.service.onEditForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='60%';
    this.dialog.open(EmployeeFormComponent,dialogConfig);
  }
  
  onDelete(id:string){
    this.service.openConfirmDialog().afterClosed().subscribe(
      res => {
          this.service.deleteData(id).subscribe()
          this.notificationService.delete("! Deleted Successfully")
          this.service.onReferesh()
      }
    );
  }
  
}
