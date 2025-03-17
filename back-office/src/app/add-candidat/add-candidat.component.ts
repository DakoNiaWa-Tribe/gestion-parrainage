import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CandidatService } from '../view-candidat/viewCandidat.service';
import { ElecteurService } from '../electeur/electeur.service';
import { Router } from '@angular/router';
import { ApiService } from '../API/api.service';
import { ModelElecteur } from '../electeur/model-electeur';
import { ModelCandidat } from '../view-candidat/model-viewCandidat';

@Component({
  selector: 'add-candidat',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './add-candidat.component.html',
  styleUrls: ['./add-candidat.component.scss']
})
export class AddCandidatComponent implements OnInit {
  // Données des électeurs et des candidats
  modelsElecteur!: ModelElecteur[];
  modelsCandidat!: ModelCandidat[];

  // Données du formulaire
  numCarte = 0;
  nom = '';
  prenom = '';
  date = new Date(2025, 2, 9);
  mail = '';
  numTel = '';
  nomParti = '';
  slogan = '';
  photo = '';
  couleurParti1 = '';
  couleurParti2 = '';
  couleurParti3 = '';
  URL = '';

  // Sections à afficher
  hiddenElecteur = true;
  hiddenCandidat = true;
  hiddenElecteurCandidat = true;

  hidden = true;

  constructor(
    private serviceCandidat: CandidatService,
    private router: Router,
    private serviceElecteur: ElecteurService,
    private api: ApiService
  ) {}

  // Ajouter un candidat
  addCandidat(): void {
    this.api.postCandidat(
      this.numCarte,
      this.nomParti,
      this.mail,
      this.couleurParti1,
      this.couleurParti2,
      this.couleurParti3,
      this.photo,
      this.numTel,
      this.slogan,
      this.URL
    ).subscribe(
      response => {
        alert('Candidat inscrit avec succès !');
      },
      error => {
        alert('Erreur de connexion');
        console.error('Erreur de connexion: ', error);
      }
    );
  }

  // Vérifie si le numCarte existe dans les électeurs ou les candidats
  Verifie(): void {
    // Réinitialiser l'état des sections
    this.hiddenElecteur = true;
    this.hiddenCandidat = true;
    this.hiddenElecteurCandidat = true;
    this.hidden = true;

    // Vérifier si c'est un candidat
    const candidat = this.modelsCandidat.find(c => c.numCarte === this.numCarte);
    if (candidat) {
      this.hiddenCandidat = false;
      this.hiddenElecteur = true;
      this.hiddenElecteurCandidat = true;
    }

    // Vérifier si c'est un électeur
    const electeur = this.modelsElecteur.find(e => e.numElecteur === this.numCarte);
    if (electeur) {
      this.nom = electeur.nom;
      this.prenom = electeur.prenom;
      this.date = electeur.date_naissance;

      this.hiddenElecteur = false;
      this.hiddenCandidat = true;
      this.hiddenElecteurCandidat = true;
    }

    // Si ce n'est ni un candidat ni un électeur, afficher la section "Electeur ou Candidat"
    if (this.hiddenElecteur && this.hiddenCandidat) {
      this.hiddenElecteurCandidat = false;
      this.hiddenCandidat = true;
      this.hiddenElecteur = true;
    }
  }

    ngOnInit(): void {
      // Charger les électeurs et les candidats au démarrage du composant
      this.modelsElecteur = this.serviceElecteur.getElecteurs(); // Si tu veux charger aussi les électeurs
      this.serviceCandidat.getcandidats().subscribe((candidats: ModelCandidat[]) => {
        this.modelsCandidat = candidats; // Assigner les candidats une fois la réponse reçue
      });
    }

    back(): void {
      this.router.navigateByUrl('LandingPage', { replaceUrl: true });
    }
}
