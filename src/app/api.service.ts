import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  emps:any;
  constructor(private _http: HttpClient) { }
  apiUrl = 'http://localhost:3000/emp';


  //Get all data
  getAllData():Observable<any>{
    return this._http.get(`${this.apiUrl}`);
  }
  getSingleEmp(EmpID: number):Observable<any>{
    return this._http.get(`${this.apiUrl}/${EmpID}`);
  }

  //Create New User
  createNewEmp(data:any): Observable<any>{
    return this._http.post(`${this.apiUrl}`, data);
  }

  //Edit User
  editEmp(EmpID: number, value: any): Observable<Object> {
    return this._http.put(`${this.apiUrl}/${EmpID}`, value);
  }
  
  //Delete User
  deleteEmp(EmpID: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${EmpID}`);
  }

}
