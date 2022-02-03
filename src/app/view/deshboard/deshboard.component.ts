import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommanService } from '../../service/comman.service';

@Component({
  selector: 'app-deshboard',
  templateUrl: './deshboard.component.html',
  styleUrls: ['./deshboard.component.css']
})
export class DeshboardComponent implements OnInit {
  display = "none";
  showUser="none";
  userList:any[]=[];
  singleUser:any={};
  constructor(private router: Router, private service:CommanService,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.getAll();
      
  }

  getAll() {
    this.service.getUsersList().subscribe((res:any)=>{
      const userData= res;  
      if(userData.success){
        this.userList= userData.data;
        this.toastr.success(userData.message);
      }else{
        this.toastr.error(userData.message);
      }
    }, error => {
      this.toastr.error(error);
    });
  }
  //Show user
  openModal(userId:any) {
    this.display = "block";
    this.service.getSingleUser(userId).subscribe((res:any)=>{
      const addUser= res;
      if(addUser.success){
        this.singleUser=addUser.data.oneUser;
        this.toastr.success(addUser.message);
      }else{
        this.toastr.error(addUser.message);
      }
    });
  }
  onCloseHandled() {
    this.display = "none";
  }
//delete user
  deleteUser(userId:any) {
    this.showUser = "block";
    this.service.deleteUser(userId).subscribe((res:any)=>{
      const resObj=res;
      if(resObj.success){
        this.getAll();
        this.toastr.error(resObj.message);
      }
      else{
        this.toastr.error(resObj.message);
      }
    });
  }
  // deleteUserHandled() {
  //   this.showUser = "none";
  // }
  //edit form deshboard/edit/:id

  editUser(userId:any){
    this.router.navigate([`deshboard/edit/${userId}`]);
  }

  //get user data form dataBase
  

}

