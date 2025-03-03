import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelDashboard } from './model-dashboard';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  constructor(private router: Router, private service: DashboardService){}

  models!: ModelDashboard[];

  ngOnInit(): void {
    this.models = this.service.getdashboard();
  }
  
  back(): void {
    this.router.navigateByUrl('LandingPage');
  }
}
