import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Doctor } from 'src/app/models/doctores';
import { DoctorService } from 'src/app/Services/doctor.service';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-create-doc',
  templateUrl: './dialog-create-doc.component.html',
  styleUrls: ['./dialog-create-doc.component.css']
})
export class DialogCreateDocComponent implements OnInit {
  doctor:Doctor= new Doctor();
  usuario:Usuarios = new Usuarios();
  constructor(private doctorService:DoctorService, private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  clear(){
    this.doctor.DocCodigo=0;
    this.doctor.DocNombre="";
    this.doctor.DocApellido="";
    this.doctor.DocTelefono="";
    this.doctor.DocEmail="";
    this.doctor.DocEspecialidades="";
    this.doctor.UserCodigo="";
    this.doctor.DocHorarioInicial="";
    this.doctor.DocHorarioFinal="";
    this.usuario.UserNombre="";
    this.usuario.UserPassword="";
  }
  
  onAddDoctor(doctor:Doctor):void{
    this.usuario.RlCodigo=1;
    this.usuarioService.addUsuarios(this.usuario).subscribe(res=>{
      var da = JSON.stringify(res);
      var data = JSON.parse(da).userCodigo;
      this.doctor.DocCodigo=data;
      this.doctor.UserCodigo=data;
      this.doctorService.addDoctor(doctor).subscribe(res=>{
        if(res){
          Swal.fire("Agregado",'Se ha agregado el doctor '+this.doctor.DocNombre+' '+this.doctor.DocApellido+' de manera exitosa','success')
          this.clear();
          this.volverDoctorLista();
        }
        else{
          alert("Error!")
        }
      })
    })
  }

  volverDoctorLista(){
    this.router.navigate(["/Doctores"]);
  }
  
}
