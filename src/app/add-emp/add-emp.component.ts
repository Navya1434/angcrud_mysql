import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

export class Emp {
  EmpID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Mobile: string;
  Address: string;
  City: string;
}

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.scss']
})
export class AddEmpComponent implements OnInit {

  errormsg:any;
  successmsg: any;
  emp: Emp = new Emp();
  empForm: FormGroup;

  constructor( 
    private fb: FormBuilder, 
    private apiservice: ApiService, 
    private actrouter: ActivatedRoute, 
    private router: Router
    ) { }

    ngOnInit(): void {
      this.empForm = this.fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        Address: ['', Validators.required],
        City: ['', Validators.required]
      });
    }
  
    onSubmit() {
      if (!this.empForm.valid) {
        return;
      }
      if(this.empForm.valid){
        this.apiservice.createNewEmp(this.empForm.value).subscribe((res)=>{
          console.log(res, 'data submitted');
          this.empForm.reset();
          this.successmsg = res.message;
        })
      } else {
        this.errormsg ="All field required.";
      }
    }
  
  }


    