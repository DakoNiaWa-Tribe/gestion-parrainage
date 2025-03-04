import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');



  // Méthode pour ajouter un candidat
  postCandidat(
    numero_electeur: number,
    nom_parti: string,
    adresse_mail: string,
    couleur_parti_1: string,
    couleur_parti_2: string,
    couleur_parti_3: string,
    photo: string,
    numero_tel: string,
    slogan: string,
    url_page: string
  ): Observable<any> {
    const apiUrl = `https://backend-fast-api-i1g8.onrender.com/candidat/registration?numero_electeur=${numero_electeur}`;

    // Créer un FormData pour envoyer un fichier et des paramètres
    const formData = new FormData();
    formData.append('nom_parti', nom_parti);
    formData.append('adresse_mail', adresse_mail);
    formData.append('couleur_parti_1', couleur_parti_1);
    formData.append('couleur_parti_2', couleur_parti_2);
    formData.append('couleur_parti_3', couleur_parti_3);
    //formData.append('photo', photo);
    formData.append('numero_tel', numero_tel);
    formData.append('slogan', slogan);
    formData.append('url_page', url_page);

    // Définir les headers
    const headers = new HttpHeaders({
      'accept': 'application/json',
    });

    // Envoyer la requête POST avec FormData
    return this.http.post(apiUrl, formData, { headers });
  }



  // Méthode pour afficher les candidats
  getCandidat(): Observable<any> {
    const apiUrl = 'https://backend-fast-api-i1g8.onrender.com/candidat/all';

    const headers = new HttpHeaders({
      'accept': 'application/json',
      // Pas besoin de définir Content-Type ici non plus
    });

    return this.http.get(apiUrl, { headers });
  }



  // Méthode pour uploader la liste des électeurs
  postUploadeElecteurs(file: File, checksum: string, userId: number): Observable<any> {
    const apiUrl = 'https://backend-fast-api-i1g8.onrender.com/admin/upload_electeur_csv';

    // Récupérer le token depuis le localStorage
    let token = localStorage.getItem('token');

    // Créer un FormData pour envoyer un fichier et des paramètres
    const formData = new FormData();
    formData.append('file', file);  // Ajouter le fichier au formulaire
    formData.append('checksum', checksum);  // Ajouter le checksum
    formData.append('userId', userId.toString());  // Ajouter le userId (en tant que string)

    // Définir les headers
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Envoyer la requête POST avec FormData
    return this.http.post(apiUrl, formData, { headers });
  }



  // Méthode pour afficher les statistiques par candidat
  getStatistique(): Observable<any> {
    const apiUrl = 'http://backend-fast-api-i1g8.onrender.com/admin/get_parrainage_statistiques';

    // Récupérer le token depuis le localStorage
    let token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(apiUrl, { headers });
  }
}
