import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelDashboard } from './model-dashboard';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  models: ModelDashboard[] = [];

  constructor(private router: Router, private service: DashboardService) {}

  ngOnInit(): void {
    // On s'abonne à l'observable retourné par le service pour récupérer les données
    this.service.getDashboard().subscribe(
      (data: ModelDashboard[]) => {
        this.models = data; // On stocke les données dans la variable models
      },
      (error) => {
        console.error('Erreur lors de la récupération des données du dashboard', error);
      }
    );
  }

  // Méthode pour revenir à la page précédente ou à la Landing Page
  back(): void {
    this.router.navigateByUrl('LandingPage');
  }
}

