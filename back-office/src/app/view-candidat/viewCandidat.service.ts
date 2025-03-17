import { ModelCandidat } from "./model-viewCandidat";
import { Injectable } from "@angular/core";
import { ApiService } from "../API/api.service";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CandidatService {
    constructor(private api: ApiService) {}

    modelCandidats: ModelCandidat[] = [];

    // Fonction pour récupérer les candidats depuis l'API
    getcandidats(): Observable<ModelCandidat[]> {
        return new Observable((observer) => {
            this.api.getCandidat().subscribe(
                (valeur1: any) => {
                    const candidats = valeur1.candidats; // On suppose que 'candidats' est un tableau d'objets

                    // Vide le tableau des candidats avant d'ajouter les nouveaux
                    this.modelCandidats = [];

                    // Utilisation d'une boucle for au lieu de map
                    if (Array.isArray(candidats)) {
                        for (let i = 0; i < candidats.length; i++) {
                            const candidat = candidats[i];
                            const modelCandidat = new ModelCandidat(
                                candidat.numero_electeur, // Assurez-vous que ces clés existent dans votre réponse API
                                candidat.nom,
                                candidat.prenom,
                                new Date(candidat.date_naissance),
                                candidat.email,
                                candidat.telephone,
                                candidat.parti_politique,
                                candidat.slogan,
                                candidat.photo_url,
                                candidat.couleur_parti_1,
                                candidat.couleur_parti_2,
                                candidat.couleur_parti_3,
                                candidat.page_info_url,
                                candidat.age
                            );
    
                            // Ajoute le candidat transformé au tableau
                            this.modelCandidats.push(modelCandidat);
                        }    
                      }
                    
                    // On retourne le tableau des candidats transformés
                    observer.next(this.modelCandidats);
                    observer.complete();
                },
                (error) => {
                    observer.error(error);  // Gestion des erreurs
                }
            );
        });
    }
}
