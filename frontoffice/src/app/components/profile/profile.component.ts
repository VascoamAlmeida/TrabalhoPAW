import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersRestServiceService } from '../../services/users-rest-service.service';
import { valeModel } from '../../models/Vale';
import { ValesRestServiceService } from '../../services/vales-rest-service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'

})
export class ProfileComponent implements OnInit {
  user?:UserModel;
  vales: valeModel[] = []

  constructor(private router: Router, private userService: UsersRestServiceService, private valeService: ValesRestServiceService, private route: ActivatedRoute) { 
   
  }

  ngOnInit(): void {
    let idTemp = localStorage.getItem('id');
    if (idTemp !== null) {
      let id = JSON.parse(idTemp);
      this.userService.get(id).subscribe((data : UserModel)=>{
        this.user = data;
        console.log(this.user);
  
        if(this.user?.vales){
          this.user.vales.forEach((valeId: string) => {
            this.valeService.getVale(valeId).subscribe((data: valeModel) => {
              this.vales.push(data);
            });
          });
        }
      });
    }
  }

}

