import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadeModel } from '../../models/Entidade';
import { EntidadesRestServiceService } from '../../services/entidades-rest-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DoacoesRestServiceService } from '../../services/doacoes-rest-service.service';

@Component({
  selector: 'app-fazer-doacao',
  templateUrl: './fazer-doacao.component.html',
  styleUrl: './fazer-doacao.component.css'
})
export class FazerDoacaoComponent implements OnInit {

  doacaoForm = new FormGroup({
    quantidade: new FormControl(''),
    observacoes: new FormControl('')
  })

  @Input() entidade!: EntidadeModel

  constructor(private router: Router ,private route: ActivatedRoute, private entidadeRest: EntidadesRestServiceService, private doacoesRest: DoacoesRestServiceService){}

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['idEnt'];
    this.entidadeRest.get(idTemp).subscribe((data : EntidadeModel)=>{
      this.entidade = data;
    })
  }

  get pontosEstimados(): number {
    const quantidade = Number(this.doacaoForm.get('quantidade')?.value || 0);
    return Math.max(0, quantidade);
  }

  createDoacao(){
    if(this.doacaoForm){
      const quantidade = this.doacaoForm.get('quantidade')?.value;
      const observacoes = this.doacaoForm.get('observacoes')?.value;
      const userIdStorage = localStorage.getItem('id');
      const userId = userIdStorage ? JSON.parse(userIdStorage) : null;
      const entidadeId = this.entidade._id;
      const newDoacao = {
        user: userId,
        entidade: entidadeId,
        quantidade: quantidade,
        data: new Date(),
        observacoes: observacoes
      };
      this.doacoesRest.create(newDoacao).subscribe(response => {
      });
      this.router.navigate(['/historico']);
    }
  }
}
