import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  EmpID: number;
  emp: any;
  constructor(
    private route: ActivatedRoute,
    private apiservice: ApiService
  ) { }

  ngOnInit(): void {
    this.EmpID = this.route.snapshot.params['EmpID'];
    this.apiservice.getSingleEmp(this.EmpID).subscribe((res)=>{
      this.emp = res.data;
    })
  }

}
