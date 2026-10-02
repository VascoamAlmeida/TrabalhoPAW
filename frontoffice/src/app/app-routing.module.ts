import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
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

const routes: Routes = [
    {
        path: 'profile-entidade', component: ProfileEntidadeComponent
    },
    {
        path: 'historico-entidade', component: HistoricoEntidadeComponent
    },
    {
        path: 'register-entidade', component: RegisterEntidadeComponent
    },
    {
        path: 'login-entidade', component: LoginEntidadeComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'vales', component: ValesListComponent
    },
    {
        path: 'fazer-doacao/:idEnt', component: FazerDoacaoComponent
    },
    {
        path: 'entidades', component: EntidadesListComponent
    },
    {
        path: 'historico', component: HistoricoDoadorComponent
    },
    {
        path: 'profile', component: ProfileComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: '**', redirectTo: 'home'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  