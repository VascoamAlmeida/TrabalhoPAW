import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';
import { UserModel } from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {


  constructor(
    private route: Router,
    private auth: AuthRestServiceService,
  ) {}

  ngOnInit(): void {
  
  }

  getCurrentUser() {
    return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') as string) : undefined;
  }

  getCurrentRole() {
    return localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role') as string) : undefined;
  }

  getUrl(): string {
    return this.route.url;
  }


  logout() {
    this.auth.logout();
    this.route.navigate(['/home']);
  }

  login() {
    this.route.navigate(['/login']);
  }
  register(){
    this.route.navigate(['/register']);
  }

}
