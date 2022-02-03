import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommanService } from '../../service/comman.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registeredForm: any;
  issubmited=false;
  isPasswordMatch=false;
  constructor(private router:Router, private fb: FormBuilder, 
    private services:CommanService,private toastr: ToastrService ) { }

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')) {
      this.router.navigate(['/deshboard'])
    }
    this.registeredForm= this.fb.group({
      name:['Manoj kapasia',Validators.required],
      email : ['manoj@gmail.com', [Validators.required,Validators.email]],
      number:['7896541233',Validators.required],
      password : ['manoj',Validators.required],
      conf_password : ['manoj',Validators.required]
    });
  }

  get f() {
    return this.registeredForm.controls;
  }
  onSubmit(){
    this.issubmited=true;
    //this.isPasswordMatch=false;
    if(this.registeredForm.value.password !== this.registeredForm.value.conf_password){
       this.isPasswordMatch = true;
       return
    }
    if (this.registeredForm.invalid){
      console.log("data not valid");
      return
    }

    const dataSent= {
      name:this.registeredForm.value.name,
      email:this.registeredForm.value.email,
      number:this.registeredForm.value.number,
      password:this.registeredForm.value.password
    }
    //console.log(dataSent);
    
    this.services.saveUser(dataSent).subscribe((res:any)=>{
      const resObj= res;
      if(resObj.success){
        this.toastr.success(resObj.message);
        this.router.navigate([''])
      
      }
      else{
        this.toastr.error(resObj.message);
      }

    },error=>{ 
      console.log(error);
      
      this.toastr.error(error);});
    
  }

}
