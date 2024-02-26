import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {

  emps: any;
  constructor(private apiservice: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllEmps();
  }

  getAllEmps(){
    this.apiservice.getAllData().subscribe((res)=>{
      this.emps = res.data;
    });
  }

  empDetails(EmpID: number){
    this.router.navigate(['details', EmpID]);
  }

  editDetails(EmpID: number){
    this.router.navigate(['edit', EmpID]);
  }

  //delete User
  removeEmp(EmpID:number){
    this.apiservice.deleteEmp(EmpID).subscribe((res)=>{
      //after delete get rest data
      this.getAllEmps();
    });
  }

}
