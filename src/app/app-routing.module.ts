import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogCreateDocComponent } from './componentes/dialog-create-doc/dialog-create-doc.component';
import { DoctoresComponent } from './componentes/doctores/doctores.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Doctores',component:DoctoresComponent},
  {path:'Agregar-doctor',component:DialogCreateDocComponent},
  {path:'Usuarios', component:UsuariosComponent},
  {path:'Pacientes',component:PacientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
