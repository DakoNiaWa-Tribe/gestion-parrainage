import { ModelCandidat } from "../models/model-candidat"
import { ModelElecteur } from "../electeur/model-electeur"
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CandidatService } from '../services-candidat/candidat.service'
import { ElecteurService } from '../electeur/electeur.service'
import { Router } from '@angular/router';



@Component({
  selector: 'add-candidat',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './add-candidat.component.html',
  styleUrl: './add-candidat.component.scss'
})

export class AddCandidatComponent{
    constructor(private serviceCandidat: CandidatService, private router: Router, private serviceElecteur: ElecteurService){}
    modelsElecteur!: ModelElecteur[] ;
    modelsCandidat!: ModelCandidat[] ;

    addCandidat(){

        const candidat = new ModelCandidat(this.numCarte, this.nom, this.prenom, this.date, this.mail, this.numTel, this.nomParti, this.slogan, this.photo, this.couleurParti1, this.couleurParti2, this.couleurParti3, this.URL);
        this.serviceCandidat.addCandidat(candidat);
        
        console.log(this.serviceCandidat.getcandidats());
        
    }

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

    hiddenElecteur = true;
    hiddenCandidat = true;
    hiddenElecteurCandidat = true;

    hidden = true;

    Verifie(){
      this.modelsElecteur = this.serviceElecteur.getElecteurs();
      this.modelsCandidat = this.serviceCandidat.getcandidats();

      for(let i = 0; i < this.modelsCandidat.length; i++){
        if(this.modelsCandidat[i].numCarte === this.numCarte){
          this.hiddenCandidat = false;
          this.hiddenElecteur = true;
          this.hiddenElecteurCandidat = true;

          this.hidden = false;
        }
      }

      let j = 0;
      //Boucle Version 1
      for(let i = 0; i < this.modelsElecteur.length; i++){
        if(this.modelsElecteur[i].numElecteur === this.numCarte && this.hidden){
          this.nom = this.modelsElecteur[i].nom;
          this.prenom = this.modelsElecteur[i].prenom;
          this.date = this.modelsElecteur[i].date_naissance;

          this.hiddenElecteur = false;
          this.hiddenCandidat = true;
          this.hiddenElecteurCandidat = true;

          this.hidden = false;

        }
      }

      if(this.hidden){
        this.hiddenElecteurCandidat = false;
        this.hiddenCandidat = true;
        this.hiddenElecteur = true;
      }
      
      //Boucle Version 2
      /*for(const model of this.models){
        if(model.numElecteur === this.numCarte){
          this.nom = model.nom;
          this.prenom = model.prenom;
          this.date = model.date_naissance;
          console.log(model.nom);
          break
        }
      }*/
      
      //Boucle Version 3
      /*this.models.forEach(
        model => {
          if(model.numElecteur === this.numCarte){
            this.nom = model.nom;
            this.prenom = model.prenom;
            this.date = model.date_naissance;
            console.log(model.nom);
          }
        }
      )*/
    }

    back(): void {
      this.router.navigateByUrl('');
    }
}
