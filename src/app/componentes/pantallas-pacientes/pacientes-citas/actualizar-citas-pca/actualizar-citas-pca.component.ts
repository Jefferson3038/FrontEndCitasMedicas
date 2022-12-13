import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActualizarCitaComponent } from 'src/app/componentes/citas/actualizar-cita/actualizar-cita.component';
import { Citas } from 'src/app/models/citas';
import { CitasService } from 'src/app/Services/citas.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PacientesService } from 'src/app/Services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-citas-pca',
  templateUrl: './actualizar-citas-pca.component.html',
  styleUrls: ['./actualizar-citas-pca.component.css']
})
export class ActualizarCitasPcaComponent implements OnInit {

  listaDoctores:any =[];
  listaPacientes:any=[];

 constructor(private citasService:CitasService, public dialogRef:MatDialogRef<ActualizarCitaComponent>, 
  @Inject(MAT_DIALOG_DATA) public citas:Citas,private doctorService:DoctorService,private pacienteService:PacientesService) {   
   }
   
  ngOnInit(): void {
    this.obtenerDoctores();
    this.obtenerPacientes();
  }

  obtenerDoctores(){
    this.doctorService.getDoctor("A").subscribe(res=>{
      this.listaDoctores=res;
    });
  }

  obtenerPacientes(){
    this.pacienteService.getPaciente("A").subscribe(res=>{
      this.listaPacientes=res;
    });
  }

  onUpdateDoctor(citas:Citas):void{
    this.citasService.updateCita(citas.CtCodigo, citas).subscribe(res => {
      if(res){
        Swal.fire("Actualizado",'Se ha actualizado la cita de manera exitosa','success')
        this.cerrarDialog();
        this.clear();
      }
     else {
      alert('error')    
    }}, error=> Swal.fire("Error","El horario ya esta ocupado","error"));
  }

  clear(){
    this.citas.CtCodigo = 0;
    this.citas.PacCodigo = 0;
    this.citas.CtDescripcion = "";
    this.citas.DocCodigo = 0;
    this.citas.CtHorarioFinal = new Date();
    this.citas.CtHorarioInicial = new Date();
  }

  onDeleteDoctor(citas:Citas):void{
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Este elemento sera eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, mantener'
    }).then((result)=>{
      if(result.value){
        this.citasService.deleteCita(citas.CtCodigo).subscribe(res => {
          if(res){
            this.clear();
            this.cerrarDialog();
            Swal.fire("Eliminado",'Se ha eliminado la cita de manera exitosa','success')
          } else {
            alert('Error!')
          }
        });
      }
      return false
    })
  }
  
  cerrarDialog():void{
    this.dialogRef.close();
  }
}

