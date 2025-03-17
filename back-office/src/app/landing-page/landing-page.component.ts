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
    this.router.navigateByUrl('AddCandidat', { replaceUrl: true });
  }

  onViewCandidat(): void {
    this.router.navigateByUrl('ViewCandidat', { replaceUrl: true });
  }

  onParrainage(): void {
    this.router.navigateByUrl('Parrainage', { replaceUrl: true });
  }

  onUploadElecteur(): void {
    this.router.navigateByUrl('UploadElecteur', { replaceUrl: true });
  }

  onDashboard(): void {
    this.router.navigateByUrl('Dashboard', { replaceUrl: true });
  }

  onDisconnect(): void{
    localStorage.clear();
    this.router.navigateByUrl('', { replaceUrl: true });
  }
}