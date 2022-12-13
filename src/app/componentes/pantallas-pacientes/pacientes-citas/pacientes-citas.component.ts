import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Citas } from 'src/app/models/citas';
import { CitasService } from 'src/app/Services/citas.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PacientesService } from 'src/app/Services/pacientes.service';
import Swal from 'sweetalert2';
import { ActualizarCitasPcaComponent } from './actualizar-citas-pca/actualizar-citas-pca.component';


@Component({
  selector: 'app-pacientes-citas',
  templateUrl: './pacientes-citas.component.html',
  styleUrls: ['./pacientes-citas.component.css']
})
export class PacientesCitasComponent implements OnInit {

  cita:Citas = new Citas();
  datatable:any = [];
  pacienteCitas:any=[];
  titulo:string;
  pacienteCodigo:number=14;
  
  constructor(private citaService:CitasService,private router:Router, 
  private doctorService:DoctorService, private pacienteService:PacientesService,private dialog?:MatDialog,
   )
    {
    }


  ngOnInit(): void{
    this.onDataTable();
  }

  openDialog(): void {
    if(this.dialog){
      const dialogRef = this.dialog.open(ActualizarCitasPcaComponent, {
      width: '50%',
      data: this.cita
      });
      dialogRef.afterClosed().subscribe(res=>{
          this.onDataTable();
        }
      )
    }
  }

  onDataTable(){
    this.citaService.getCita("A",this.pacienteCodigo).subscribe(res=>{
      if(res)
      this.datatable=res;
    });
    this.titulo="Citas"
  }

  onDeleteCita(select:any):void{
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Este elemento sera eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, mantener'
    }).then((result)=>{
      if(result.value){
        this.citaService.deleteCita(select.ctCodigo).subscribe(res => {
          if(res){
            Swal.fire("Eliminado",'Se elimino la cita de manera exitosa','success')
            this.clear();
            this.onDataTable();
          } else {
            alert('Error!')
          }
        });
      }
      return false
    })
  }

  onSetData(select:any){
    this.cita.CtCodigo = select.ctCodigo;
    this.cita.PacCodigo = select.pacCodigo;
    this.cita.CtDescripcion = select.ctDescripcion;
    this.cita.DocCodigo = select.docCodigo;
    this.cita.CtHorarioFinal = select.ctHorarioFinal;
    this.cita.CtHorarioInicial = select.ctHorarioInicial;
    console.log(this.cita)
    this.openDialog();
  }

  clear(){
    this.cita.CtCodigo = 0;
    this.cita.PacCodigo = 0;
    this.cita.CtDescripcion = "";
    this.cita.DocCodigo = 0;
    this.cita.CtHorarioFinal = new Date();
    this.cita.CtHorarioInicial = new Date();
  }

  vistaAgregar(){
    this.router.navigate(["/Agregar-cita"]);
  }
}