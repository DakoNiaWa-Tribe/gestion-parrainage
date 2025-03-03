import { Injectable } from "@angular/core";
import {ModelElecteur} from "./model-electeur"

@Injectable({
    providedIn: 'root'
})

export class ElecteurService{

    modelElecteurs : ModelElecteur[] = [
        new ModelElecteur(
            237529244,
            '14781947380134900',
            'Diop',
            'Lamine',
            new Date(1952, 9, 8),
            'Touba',
            'M',
            '12'
        ),
        new ModelElecteur(
            100,
            '',
            'Gone',
            'Ainz Owl',
            new Date(),
            '????',
            'M',
            ''
        )
    ]

    getElecteurs(): ModelElecteur[]{
        return this.modelElecteurs;
    }

}