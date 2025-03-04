import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor(private router: Router){}

  onAddCandidat(): void {
    this.router.navigateByUrl('AddCandidat');
  }

  onViewCandidat(): void {
    this.router.navigateByUrl('ViewCandidat');
  }

  onParrainage(): void {
    this.router.navigateByUrl('Parrainage');
  }

  onUploadElecteur(): void {
    this.router.navigateByUrl('UploadElecteur');
  }

  onDashboard(): void {
    this.router.navigateByUrl('Dashboard');
  }
}