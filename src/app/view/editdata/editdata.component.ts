import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommanService } from '../../service/comman.service';

@Component({
  selector: 'app-editdata',
  templateUrl: './editdata.component.html',
  styleUrls: ['./editdata.component.css']
})
export class EditdataComponent implements OnInit {
  editForm: any;
  issubmited=false;
  currentId:any;
  singleUser:any;
  constructor(private router:Router, private fb: FormBuilder,
    private service:CommanService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.editForm= this.fb.group({
      name:['',Validators.required],
      email : ['', [Validators.required,Validators.email]],
      number:['',Validators.required],
     
    });
    // for check8ing current route
    //using for id 
    this.currentId=this.router.url.split('/')[3];
   // console.log(this.currentId);
    
    this.getUserData();

  }

  getUserData(){
    this.service.getSingleUser(this.currentId).subscribe((res:any)=>{
      const addUser= res;
      this.singleUser=addUser.data.oneUser;
      //console.log(this.singleUser);
      this.editForm.patchValue({
        name:this.singleUser.name,
        email:this.singleUser.email,
        number: this.singleUser.number
      });
      //console.log(this.editForm);
      
    });
  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit(){
    this.issubmited=true;
    
     if(this.editForm.invalid){
      console.log("data not valid");
      return
    }else{
      // console.log(this.editForm);
       const dataSent= {
         id:this.currentId,
        name:this.editForm.value.name,
        email:this.editForm.value.email,
        number:this.editForm.value.number,
      }
       this.service.updateUser(dataSent).subscribe((res:any)=>{
        const resObj= res;
        //console.log(userData);
        if(resObj.success){
          this.toastr.success(resObj.message);
          this.router.navigate(['deshboard']);
        }
        else{
          this.toastr.error(resObj.message);
        }
        
       });
      
    }
    
  }

}
