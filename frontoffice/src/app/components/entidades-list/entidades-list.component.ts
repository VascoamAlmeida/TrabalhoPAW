import { Component, OnInit } from '@angular/core';
import { EntidadesRestServiceService } from '../../services/entidades-rest-service.service';

@Component({
  selector: 'app-entidades-list',
  templateUrl: './entidades-list.component.html',
  styleUrl: './entidades-list.component.css'
})
export class EntidadesListComponent implements OnInit{
  entidades: any[] = [];
  imageUrl = "http://localhost:3000/uploads/companyLogos/";
  searchOptions = {
    name: '',
    localizacao: ''
  };

  constructor(private entidadesService: EntidadesRestServiceService) {}

  ngOnInit(): void {
    this.entidadesService.getAll().subscribe((entidades: any[]) => {
      this.entidades = entidades;
      console.log(entidades)
    });
  }

  onSearch(): void {
    this.entidadesService.searchEntidades(this.searchOptions).subscribe((data) => {
      this.entidades = data
    });
  }
  
}
