import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';
import { NotificationService } from '../service/notification.service';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  constructor(public service:EmployeeService,
    private dialogRef:MatDialogRef<EmployeeFormComponent>,
    private notificationService:NotificationService) { }
  
  public maxDate = new Date();
  ngOnInit(): void {
  }

  onSubmit(){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    
    if(this.service.employeeForm.valid){
      if(!this.service.employeeForm.get('id')?.value){
        
        this.service.postData(this.service.employeeForm.value).subscribe(
          data => {
            console.log(data),
            this.service.employeeForm.reset(),
            this.notificationService.success(':: Submitted Successfully');
            this.service.onReferesh(),
            this.onClose()
        });
      }else{
        this.onUpload();
        this.service.editData(this.service.employeeForm.value,this.service.employeeForm.value.id).subscribe(
          data => {
            console.log(data),
            this.service.employeeForm.reset(),
            this.notificationService.success(':: Submitted Successfully'),
            this.service.onReferesh(),
            this.onClose()
        });
      }
    }  
  }

  onFileChanged(event:Event){
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
  }
  onClose(){
    this.service.employeeForm.reset(),
    this.dialogRef.close();
    
  }

  onUpload() {
    console.log(this.selectedFile);
  
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    this.service.postImage(this.service.employeeForm.value.id,uploadImageData)
      .subscribe(res => {
        console.log(uploadImageData);
      }
      );
  }
}
