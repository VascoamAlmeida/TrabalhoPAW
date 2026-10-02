import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HistoricoDoadorComponent } from './components/historico-doador/historico-doador.component';
import { EntidadesListComponent } from './components/entidades-list/entidades-list.component';
import { FazerDoacaoComponent } from './components/fazer-doacao/fazer-doacao.component';
import { ValesListComponent } from './components/vales-list/vales-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginEntidadeComponent } from './components/login-entidade/login-entidade.component';
import { RegisterEntidadeComponent } from './components/register-entidade/register-entidade.component';
import { HistoricoEntidadeComponent } from './components/historico-entidade/historico-entidade.component';
import { ProfileEntidadeComponent } from './components/profile-entidade/profile-entidade.component';
@NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      HeaderComponent,
      ProfileComponent,
      HistoricoDoadorComponent,
      EntidadesListComponent,
      FazerDoacaoComponent,
      ValesListComponent,
      HomeComponent,
      LoginEntidadeComponent,
      RegisterEntidadeComponent,
      HistoricoEntidadeComponent,
      ProfileEntidadeComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      MatInputModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatSortModule,
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatButtonToggleModule,
      MatSelectModule,
      ReactiveFormsModule
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi:true}, provideAnimationsAsync()],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  