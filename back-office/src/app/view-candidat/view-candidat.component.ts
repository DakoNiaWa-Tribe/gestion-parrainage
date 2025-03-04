import { ModelCandidat } from "./model-viewCandidat";
import { Component, OnInit } from '@angular/core';
import { CandidatService } from './viewCandidat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'view-candidat',
  templateUrl: './view-candidat.component.html',
  styleUrls: ['./view-candidat.component.scss']
})

export class ViewCandidatComponent implements OnInit {
  constructor(private service: CandidatService, private router: Router) {}
  
  models!: ModelCandidat[];

  ngOnInit(): void {
    // S'abonner à l'observable pour récupérer les données
    this.service.getcandidats().subscribe(
      (candidats: ModelCandidat[]) => {
        this.models = candidats;  // Assignation des candidats récupérés à la variable models
        console.log('succes: ', candidats)
      },
      (error) => {
        console.error('Erreur lors du chargement des candidats:', error);
      }
    );
  }

  back(): void {
    this.router.navigateByUrl('LandingPage');
  }
}
