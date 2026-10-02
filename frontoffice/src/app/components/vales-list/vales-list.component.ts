import { Component, OnInit } from '@angular/core';
import { ValesRestServiceService } from '../../services/vales-rest-service.service';
import { UsersRestServiceService } from '../../services/users-rest-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vales-list',
  templateUrl: './vales-list.component.html',
  styleUrl: './vales-list.component.css'
})
export class ValesListComponent implements OnInit {
  vales: any[] = [];
  imageUrl = "https://w7.pngwing.com/pngs/952/559/png-transparent-vu-university-amsterdam-voucher-discounts-and-allowances-gift-card-voucher-gift-miscellaneous-purple-university-thumbnail.png";

  constructor(private router: Router ,private valesService: ValesRestServiceService, private usersService: UsersRestServiceService) { }

  ngOnInit(): void {
    this.valesService.getAll().subscribe((vales: any[]) => {
      this.vales = vales;
      console.log(vales)
    });
  }

  buyVale(valeId: string){
    const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const userId = JSON.parse(currentUser)._id;
    if (userId) {
      this.usersService.buyVale({userId, valeId}).subscribe(() => {
        alert('Vale comprado');
        this.router.navigate(['/profile'])
      });
    } else {
      // handle the case when userId is null
      alert('User not found');
    }
  } else {
    // handle the case when currentUser is null
    alert('User not logged in');
  }
  }

}
