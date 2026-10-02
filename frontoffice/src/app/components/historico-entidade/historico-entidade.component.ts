import { Component, OnInit } from '@angular/core';
import { DoacoesRestServiceService } from '../../services/doacoes-rest-service.service';
import { UsersRestServiceService } from '../../services/users-rest-service.service';

@Component({
  selector: 'app-historico-entidade',
  templateUrl: './historico-entidade.component.html',
  styleUrl: './historico-entidade.component.css'
})
export class HistoricoEntidadeComponent implements OnInit {
  doacoes: any[] = [];

  constructor(
    private restService: DoacoesRestServiceService,
    private usersService: UsersRestServiceService
  ) {}

  ngOnInit(): void {
    this.loadDoacoes();
  }

  loadDoacoes(): void {
    const idEntidade = localStorage.getItem('id');
    if (idEntidade === null) return;

    const parsedIdEntidade = JSON.parse(idEntidade);
    this.restService.getByEntidade(parsedIdEntidade).subscribe((doacoes) => {
      this.doacoes = doacoes;
      this.doacoes.forEach((doacao) => {
        this.usersService.get(doacao.user).subscribe((user) => {
          doacao.user = user.name;
        });
      });
    });
  }

  aceitar(id: string): void {
    this.restService.aceitar(id).subscribe(() => this.loadDoacoes());
  }

  cancelar(id: string): void {
    this.restService.cancelar(id).subscribe(() => this.loadDoacoes());
  }

  concluir(id: string): void {
    this.restService.concluir(id).subscribe(() => this.loadDoacoes());
  }
}
