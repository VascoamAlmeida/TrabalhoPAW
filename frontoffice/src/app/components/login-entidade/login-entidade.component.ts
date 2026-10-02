import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';

@Component({
  selector: 'app-login-entidade',
  templateUrl: './login-entidade.component.html',
  styleUrl: './login-entidade.component.css'
})
export class LoginEntidadeComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router, private authService: AuthRestServiceService) {
    this.email = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  login(): void{
    this.authService.loginEntidade(this.email, this.password).subscribe({
      next: (entidade: any) => {
        if (entidade && entidade.token) {
          localStorage.setItem('currentUser', JSON.stringify(entidade));
          localStorage.setItem('role', JSON.stringify("Entidade"));
          localStorage.setItem('id', JSON.stringify(entidade._id));
          this.router.navigate(['/historico-entidade']);
        }
      },
      error: (error) => {
        const message = error?.error?.message || 'Erro no login!';
        alert(message);
      }
    });
  }

  
}
