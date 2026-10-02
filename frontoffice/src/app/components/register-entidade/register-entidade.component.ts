import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';

@Component({
  selector: 'app-register-entidade',
  templateUrl: './register-entidade.component.html',
  styleUrl: './register-entidade.component.css'
})
export class RegisterEntidadeComponent {
  name = '';
  email = '';
  password = '';
  localizacao = '';

  constructor(private router: Router, private authService: AuthRestServiceService) {}

  register(): void {
    this.authService
      .registerEntidade(this.name, this.email, this.password, this.localizacao)
      .subscribe({
        next: () => {
          alert('Registo submetido. A entidade precisa de aprovação no backoffice antes de iniciar sessão.');
          this.router.navigate(['/login-entidade']);
        },
        error: () => alert('Erro no registo!')
      });
  }
}
