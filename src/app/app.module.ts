import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorService } from './Services/doctor.service';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DoctoresComponent } from './componentes/doctores/doctores.component';
import { NavComponent } from './componentes/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './componentes/doctores/dialog/dialog.component';
import { DialogCreateDocComponent } from './componentes/doctores/dialog-create-doc/dialog-create-doc.component';
import { UsuarioService } from './Services/usuarios.service';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { DialogCreatePacComponent } from './componentes/pacientes/dialog-create-pac/dialog-create-pac.component';
import { ActualizaruserDialogComponent } from './componentes/usuarios/actualizaruser-dialog/actualizaruser-dialog.component';
import { ActualizarPacienteComponent } from './componentes/pacientes/actualizar-paciente/actualizar-paciente.component';
import { RegistroPacientesComponent } from './componentes/registro-pacientes/registro-pacientes/registro-pacientes.component';
import { CitasComponent } from './componentes/citas/citas.component';
import { ActualizarCitaComponent } from './componentes/citas/actualizar-cita/actualizar-cita.component';
import { DialogCreateCitaComponent } from './componentes/citas/dialog-create-cita/dialog-create-cita.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { NavPacientesComponent } from './componentes/pantallas-pacientes/nav-pacientes/nav-pacientes.component';
import { PacientesDoctoresComponent } from './componentes/pantallas-pacientes/pacientes-doctores/pacientes-doctores.component';
import { PacientesCitasComponent } from './componentes/pantallas-pacientes/pacientes-citas/pacientes-citas.component';
import { ActualizarCitasPcaComponent } from './componentes/pantallas-pacientes/pacientes-citas/actualizar-citas-pca/actualizar-citas-pca.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DoctoresComponent,
    NavComponent,
    DialogComponent,
    DialogCreateDocComponent,
    UsuariosComponent,
    PacientesComponent,
    ActualizaruserDialogComponent,
    ActualizarPacienteComponent,
    RegistroPacientesComponent,
    DialogCreatePacComponent,
    CitasComponent,
    ActualizarCitaComponent,
    DialogCreateCitaComponent,
    PerfilComponent,
    NavPacientesComponent,
    PacientesDoctoresComponent,
    PacientesCitasComponent,
    ActualizarCitasPcaComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [DoctorService,UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
