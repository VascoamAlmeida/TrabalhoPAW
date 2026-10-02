import { Component, OnInit } from '@angular/core';
import { DoacoesRestServiceService } from '../../services/doacoes-rest-service.service';
import { EntidadesRestServiceService } from '../../services/entidades-rest-service.service';

@Component({
  selector: 'app-historico-doador',
  templateUrl: './historico-doador.component.html',
  styleUrl: './historico-doador.component.css'
})
export class HistoricoDoadorComponent implements OnInit{
  doacoes: any[] = []

  constructor(private restService: DoacoesRestServiceService, private entidadeService: EntidadesRestServiceService){}

  ngOnInit(): void {
      const idUser = localStorage.getItem('id');
      if (idUser === null) {
        // handle the case where idUser is null
        console.error('User ID is null');
        return;
      }
      const parsedIdUser = JSON.parse(idUser);
      this.restService.getByUser(parsedIdUser).subscribe(
        (doacoes) => {
          this.doacoes = doacoes;
          this.doacoes.forEach(doacao => {
            this.entidadeService.get(doacao.entidade).subscribe(
              (entidade) => {
                doacao.entidade = entidade.name; // replace the id with the name
              },
              (error) => {
                console.log(error);
              }
            );
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }
}
