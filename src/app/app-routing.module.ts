import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogCreateDocComponent } from './componentes/doctores/dialog-create-doc/dialog-create-doc.component';
import { DoctoresComponent } from './componentes/doctores/doctores.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { DialogCreatePacComponent } from './componentes/pacientes/dialog-create-pac/dialog-create-pac.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { HomeComponent } from './pages/home/home.component';
import { CitasComponent } from './componentes/citas/citas.component';
import { DialogCreateCitaComponent } from './componentes/citas/dialog-create-cita/dialog-create-cita.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { PacientesDoctoresComponent } from './componentes/pantallas-pacientes/pacientes-doctores/pacientes-doctores.component';
import { PacientesCitasComponent } from './componentes/pantallas-pacientes/pacientes-citas/pacientes-citas.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Doctores',component:DoctoresComponent},
  {path:'Agregar-doctor',component:DialogCreateDocComponent},
  {path:'Usuarios', component:UsuariosComponent},
  {path:'Pacientes',component:PacientesComponent},
  {path:'Agregar-paciente',component:DialogCreatePacComponent},
  {path:'Citas', component:CitasComponent},
  {path:'Agregar-cita', component:DialogCreateCitaComponent},
  {path:'Perfil', component:PerfilComponent},
  {path:'Vista-Doctores',component:PacientesDoctoresComponent},
  {path:'Cita-pacientes',component:PacientesCitasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
