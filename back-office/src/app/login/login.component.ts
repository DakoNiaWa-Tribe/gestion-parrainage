import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  username = '';
  password = '';

  onLogin(): void {
    let username = this.username;
    let password = this.password;
    this.authService.login(username, password).subscribe(response => {
      let token = response.access_token; // Supposons que le token soit retourné dans "token"
      localStorage.setItem('token', token);  // Stocke le token dans localStorage
      console.log('Token stocké avec succès !');
      this.router.navigateByUrl('LandingPage')
    }, error => {
      console.error('Erreur de connexion', error);
    });
  }
}
