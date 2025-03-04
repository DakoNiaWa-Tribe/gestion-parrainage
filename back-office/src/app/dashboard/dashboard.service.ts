import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelDashboard } from "./model-dashboard";

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  modelDashboard: ModelDashboard[] = [];

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les données du dashboard depuis l'API
  getDashboard(): Observable<ModelDashboard[]> {
    const apiUrl = 'https://backend-fast-api-i1g8.onrender.com/admin/get_parrainage_statistiques';
    const headers = new HttpHeaders({
      'accept': 'application/json',
    });

    return new Observable((observer) => {
      this.http.get<any>(apiUrl, { headers }).subscribe(
        (response) => {
          const dashboardData = response.dashboard; // Supposons que 'dashboard' est la clé dans la réponse contenant les données du tableau

          // Vide le tableau de données du dashboard avant d'ajouter les nouveaux
          this.modelDashboard = [];

          if (Array.isArray(dashboardData)) {
            for (let i = 0; i < dashboardData.length; i++) {
              const data = dashboardData[i];
              const modelDashboard = new ModelDashboard(
                data.numCarte, // Assurez-vous que ces clés existent dans la réponse API
                data.nom,
                data.prenom,
                data.nomParti,
                data.totalParainage
              );

              // Ajoute le modèle au tableau
              this.modelDashboard.push(modelDashboard);
            }
          }

          // Retourne le tableau des données transformées
          observer.next(this.modelDashboard);
          observer.complete();
        },
        (error) => {
          observer.error(error); // Gestion des erreurs
        }
      );
    });
  }
}
