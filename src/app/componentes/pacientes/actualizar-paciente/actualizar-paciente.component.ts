import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pacientes } from 'src/app/models/pacientes';
import { PacientesService } from 'src/app/Services/pacientes.service';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-paciente',
  templateUrl: './actualizar-paciente.component.html',
  styleUrls: ['./actualizar-paciente.component.css']
})
export class ActualizarPacienteComponent implements OnInit {

  constructor(private pacienteServie:PacientesService,private userService:UsuarioService, public dialogRef:MatDialogRef<ActualizarPacienteComponent>, @Inject(MAT_DIALOG_DATA) public paciente:Pacientes) {   
  }
  
 ngOnInit(): void {
 }

 onUpdate(paciente:Pacientes):void{
   this.pacienteServie.updatePaciente(paciente.PacCodigo, paciente).subscribe(res => {
     if(res){
       Swal.fire("Actualizado",'Se ha actualizado el doctor '+this.paciente.PacNombre+' '+this.paciente.PacApellido+' de manera exitosa','success')
       this.cerrarDialog();
       this.clear();
     } else {
       alert('Error!')
     }
   })
 }

 clear(){
  this.paciente.PacCodigo=0;
  this.paciente.PacNombre="";
  this.paciente.PacApellido="";
  this.paciente.PacTelefono="";
  this.paciente.PacEmail="";
  this.paciente.PacFechaNacimiento="";
  this.paciente.UserCodigo=0;
}

 onDelete(select:any):void{
   this.userService.deleteUsuarios(select.pacCodigo).subscribe(res=>{
     if (res){
       console.log(res)
     }
     else{
       alert('Error!')
     }
   });
   this.pacienteServie.deletePaciente(select.pacienteCodigo).subscribe(res => {
     if(res){
       this.clear();
       this.cerrarDialog();
       Swal.fire("Eliminado",'Se ha eliminado el paciente '+this.paciente.PacNombre+' '+this.paciente.PacApellido+' de manera exitosa','success')
     } else {
       alert('Error!')
     }
   });
 }
 
 cerrarDialog():void{
   this.dialogRef.close();
 }
}

