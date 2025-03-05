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
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return new Observable((observer) => {
      this.http.get<any>(apiUrl, { headers }).subscribe(
        (response) => {
          const dashboardData = response;

          // Vide le tableau de données du dashboard avant d'ajouter les nouveaux
          this.modelDashboard = [];

          if (Array.isArray(dashboardData)) {
            for (let i = 0; i < dashboardData.length; i++) {
              const data = dashboardData[i];
              const modelDashboard = new ModelDashboard(
                data.nom_candidat,
                data.prenom_candidat,
                data.parti_politique,
                data.nombre_parrainage
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
