import { ModelPeriodeParrainage } from "./model-periode-parrainage";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PeriodeParrainageService{

    periodeParrainage : ModelPeriodeParrainage = new ModelPeriodeParrainage(
        new Date(),
        new Date(),
    )

    addPeriodeParrainage(date_debut: Date, date_fin: Date){
        this.periodeParrainage.date_debut = date_debut;
        this.periodeParrainage.date_fin = date_fin;
    }

    getPeriodeParrainage(): ModelPeriodeParrainage{
        return this.periodeParrainage;
    }
}