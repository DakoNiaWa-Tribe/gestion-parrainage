import { PeriodeParrainageService } from "./periode-parrainage.service";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'periode-parrainage',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './periode-parrainage.component.html',
  styleUrl: './periode-parrainage.component.scss'
})

export class PeriodeParrainageComponent{

    constructor(private servicePeriodeParrainage: PeriodeParrainageService, private router: Router){}
    
    date_debut = new Date();
    date_fin = new Date();

    today = new Date();

    Soumettre(){
        let yearDiffDebutFin = this.date_fin.getFullYear() - this.date_debut.getFullYear();
        let monthDiffDebutFin = this.date_fin.getMonth() - this.date_debut.getMonth();
        let DiffDebutFin = monthDiffDebutFin + (yearDiffDebutFin * 12);

        let yearDiffTodayDebut = this.date_debut.getFullYear() - this.today.getFullYear();
        let monthDiffTodayDebut = this.date_debut.getMonth() - this.today.getMonth();
        let DiffTodayDebut = monthDiffTodayDebut + (yearDiffTodayDebut * 12);

        if(DiffDebutFin >= 6 && DiffTodayDebut >= 6){
            this.servicePeriodeParrainage.addPeriodeParrainage(this.date_debut, this.date_fin);
        }else{
            alert("il y'a moins de 6 mois de difference entre date de debut et la date de fin ou entre la date du jour et la date de debut");
        }

        console.log(this.servicePeriodeParrainage.getPeriodeParrainage());

    }

    back(): void {
        this.router.navigateByUrl('LandingPage');
    }

}