import { Injectable } from "@angular/core";
import {ModelElecteur} from "./model-electeur"

@Injectable({
    providedIn: 'root'
})

export class ElecteurService{

    modelElecteurs : ModelElecteur[] = [
        new ModelElecteur(
            123,
            '',
            'Dicko',
            'Moussa Elhadji',
            new Date(),
            'Segou',
            'M',
            ''
        ),
        new ModelElecteur(
            100,
            '',
            'Diallo',
            'Fatoumata Welle',
            new Date(),
            'Bamako',
            'F',
            ''
        )
    ]

    getElecteurs(): ModelElecteur[]{
        return this.modelElecteurs;
    }

}