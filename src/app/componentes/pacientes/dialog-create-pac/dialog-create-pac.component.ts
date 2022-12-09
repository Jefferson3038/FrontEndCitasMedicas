import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Doctor } from 'src/app/models/doctores';
import { Pacientes } from 'src/app/models/pacientes';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PacientesService } from 'src/app/Services/pacientes.service';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-create-pac',
  templateUrl: './dialog-create-pac.component.html',
  styleUrls: ['./dialog-create-pac.component.css']
})
export class DialogCreatePacComponent implements OnInit {
  pacientes:Pacientes= new Pacientes();
  usuario:Usuarios = new Usuarios();
  constructor(private pacienteService:PacientesService, private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  clear(){
    this.pacientes.PacCodigo = 0;
    this.pacientes.PacNombre = "";
    this.pacientes.PacApellido = "";
    this.pacientes.PacFechaNacimiento = new Date();
    this.pacientes.PacTelefono = "";
    this.pacientes.PacDireccion = "";
    this.pacientes.PacEmail = "";
    this.usuario.UserCodigo=0;
    this.pacientes.PacEstatus = "A";
    this.usuario.UserPassword="";
  }


  onAddPaciente(pacientes:Pacientes):void{
    this.usuario.RlCodigo=2;
    this.usuarioService.addUsuarios(this.usuario).subscribe(res=>{
      var da = JSON.stringify(res);
      var data = JSON.parse(da).userCodigo;
      this.pacientes.PacCodigo=data;
      this.pacientes.UserCodigo=data;
      this.pacienteService.addPaciente(pacientes).subscribe(res=>{
        if(res){
          Swal.fire("Agregado",'Se ha agregado el paciente '+this.pacientes.PacNombre+' '+this.pacientes.PacApellido+' de manera exitosa','success')
          this.clear();
          this.volverPacienteLista();
        }
        else{
          alert("Error!")
        }
      }) 
    })
  }

  volverPacienteLista(){
    this.router.navigate(["/Pacientes"]);
  }
  
}
