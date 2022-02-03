import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommanService } from '../../service/comman.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any;
  isSubmitted= false;
  constructor(private fb:FormBuilder, private router:Router, 
    private comman:CommanService, private toastr: ToastrService ) { }

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')) {
      this.router.navigate(['/deshboard'])
    }
    this.loginForm=this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    });
  }

  get loginFormControl(){
   return this.loginForm.controls;
  }
  onLogin(){
    this.isSubmitted=true;
    if(this.loginForm.invalid){
      alert("invalid data")
      return
    }
    else{
      //console.log(this.loginForm);
      this.comman.loginUser(this.loginForm.value).subscribe((res:any)=>{
        const resObj=res;
        console.log(resObj);
        if(resObj.success){
          localStorage.setItem('loggedInUser',JSON.stringify(resObj.data))
          this.toastr.success(resObj.message);
          this.router.navigate(['deshboard']);
        }else{
          this.toastr.error(resObj.message);
        }
        
      },error=>{   
        this.toastr.error(error);});
    }
    
    
  }

}
