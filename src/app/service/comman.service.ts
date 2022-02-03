import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { catchError, identity, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommanService {

  constructor(private http:HttpClient) { }

  saveUser(data:any){
   return this.http.post(environment.BASE_URL + 'user/save',data).pipe(
    catchError(this.handleError)
  );
  }

  getUsersList(){
    return this.http.get(environment.BASE_URL + 'user/list').pipe(
      catchError(this.handleError)
    );
  }

  getSingleUser(id:any){
    return this.http.get(environment.BASE_URL + `user/oneUser/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(data:any){
    return this.http.put(environment.BASE_URL + 'user/update', data).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id:any){
    return this.http.delete(environment.BASE_URL + `user/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(data:any){
    return this.http.post(environment.BASE_URL + 'user/login',data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    var errorMessage = '';
    
    if (error.status === 404) {
      errorMessage = "Requested URL not found";
    } else if (error.status === 400) {
      errorMessage ="Bed request";
    } else if (error.status === 401) {
      errorMessage ="Unauthorize!! Please login again";
    }else{
      errorMessage = error.message;
      
    }
    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }
}


