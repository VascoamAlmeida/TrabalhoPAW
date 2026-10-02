import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';
import { DoacoesRestServiceService } from '../../services/doacoes-rest-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email: string;
  password: string;

  constructor(private router: Router, private authService: AuthRestServiceService, private doacoesService: DoacoesRestServiceService) {
    this.email = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  login(): void{
    this.authService.login(this.email, this.password).subscribe({
      next: (user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('role', JSON.stringify(user.role));
          localStorage.setItem('id', JSON.stringify(user._id));
          if (user.role === 'Admin' || user.role === 'Funcionario') {
            window.location.href = 'http://localhost:3000/home';
            return;
          }
          this.router.navigate(['/profile']);
        }
      },
      error: () => alert('Email ou password inválidos.')
    });
  }

  

}
