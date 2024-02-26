import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

export class Emp {
  EmpID: number;
  FirstName: string;
  LastName:string;
  Email: string;
  Mobile: string;
  Address: string;
  City: string;
}

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.scss']
})
export class EditEmpComponent implements OnInit {

  EmpID: number;
  emp: Emp;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private apiservice: ApiService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }
 
  ngOnInit(): void {
    this.emp = new Emp();
    this.EmpID = this.route.snapshot.params['EmpID'];
    this.apiservice.getSingleEmp(this.EmpID).subscribe((res)=>{
      this.editForm.patchValue({
        FirstName: res.data[0].FirstName,
        LastName: res.data[0].LastName,
        Email: res.data[0].Email,
        Mobile: res.data[0].Mobile,
        Address: res.data[0].Address,
        City: res.data[0].City
      })
    });

    this.editForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Address: ['', Validators.required],
      City: ['', Validators.required]
    });
  }

  onSubmit() {   
    this.apiservice.editEmp(this.EmpID, this.emp).subscribe((res) => {
      this.emp = new Emp();
      this.gotoList();
    });
  }

  //go to list after update value
  gotoList() {
    this.router.navigate(['/list']);
  }

}

 
