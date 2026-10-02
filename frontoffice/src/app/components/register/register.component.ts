import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  password: string;

  constructor(private router: Router, private authService: AuthRestServiceService) {
    this.name = ""
    this.email = "";
    this.password = "";
  }

  ngOnInit(): void {
  }


  register(): void{
    this.authService.register(this.name, this.email, this.password).subscribe((user : any)=>{
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('role', JSON.stringify(user.role));
        localStorage.setItem('id', JSON.stringify(user._id));
        this.router.navigate(['/profile']);
      } else {
        alert('Erro no registo!');
      }
    })
  }

}
