import { Component, OnInit } from '@angular/core';
import { EntidadeModel } from '../../models/Entidade';
import { Router } from '@angular/router';
import { EntidadesRestServiceService } from '../../services/entidades-rest-service.service';

@Component({
  selector: 'app-profile-entidade',
  templateUrl: './profile-entidade.component.html',
  styleUrl: './profile-entidade.component.css'
})
export class ProfileEntidadeComponent implements OnInit {
  entidade?:EntidadeModel;
  imageUrl = "http://localhost:3000/uploads/companyLogos/";

  constructor(private router: Router, private entidadesService: EntidadesRestServiceService){}

  ngOnInit(): void {
    let idTemp = localStorage.getItem('id');
    if (idTemp !== null) {
      let id = JSON.parse(idTemp);
      this.entidadesService.get(id).subscribe((data : EntidadeModel)=>{
        this.entidade = data;
        console.log(this.entidade);
      });
    }
  }
}
