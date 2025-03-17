import { ModelCandidat } from "./model-viewCandidat";
import { Component, OnInit } from '@angular/core';
import { CandidatService } from './viewCandidat.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component'
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'view-candidat',
  templateUrl: './view-candidat.component.html',
  styleUrls: ['./view-candidat.component.scss'],
  imports: [
    LoaderComponent,
    CommonModule
  ]
})

export class ViewCandidatComponent implements OnInit {
  loading: boolean = true;

  constructor(private service: CandidatService, private router: Router) {}
  
  models!: ModelCandidat[];

  ngOnInit(): void {
    // S'abonner à l'observable pour récupérer les données
    this.service.getcandidats().subscribe(
      (candidats: ModelCandidat[]) => {
        this.models = candidats;  // Assignation des candidats récupérés à la variable models
        this.loading = false;
        console.log('succes: ', candidats)
      },
      (error) => {
        console.error('Erreur lors du chargement des candidats:', error);
      }
    );
  }

  back(): void {
    this.router.navigateByUrl('LandingPage', { replaceUrl: true });
  }
}
