import { Component,OnInit } from '@angular/core';
import { Citas } from 'src/app/models/citas';
import { CitasService } from 'src/app/Services/citas.service';
import {MatDialog} from '@angular/material/dialog';
import { ActualizarCitaComponent } from './actualizar-cita/actualizar-cita.component';
import Swal from 'sweetalert2';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PacientesService } from 'src/app/Services/pacientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})

export class CitasComponent implements OnInit {
  cita:Citas = new Citas();
  datatable:any = [];
  titulo:string; 
  
  
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
      const dialogRef = this.dialog.open(ActualizarCitaComponent, {
      width: '50%',
      data: this.cita
      });
      dialogRef.afterClosed().subscribe(
        res=>{
          this.onDataTable()
          console.log(res)
        }
      )
    }
  }

  onDataTable(){
    this.citaService.getCita("A").subscribe(res=>{
      this.datatable=res;
    });
    this.titulo="Citas";
  }

  onDataTableEliminados(){
    this.citaService.getCita("D").subscribe(res=>{
      this.datatable=res;
    });
    this.titulo="Citas eliminadas";
  }

  onDeleteCita(select:any):void{
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

  onRestaurar(select:any):void{
    this.citaService.updateCita(select.ctCodigo, select).subscribe(res => {
      if(res){
        Swal.fire("Restaurado",'Se ha restaurado la cita de manera exitosa','success')
        this.clear();
        this.onDataTableEliminados();
      } else {
        alert('Error!')
      }
    })
  }

  onSetData(select:any){
    this.cita.CtCodigo = select.CtCodigo;
    this.cita.PacCodigo = select.PacCodigo;
    this.cita.CtDescripcion = select.CtDescripcion;
    this.cita.DocCodigo = select.docCodigo;
    this.cita.CtHorarioFinal = select.CtHorarioFinal;
    this.cita.CtHorarioInicial = select.CtHorarioInicial;
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

  convertirFecha(select:any){
    var k = new Date(select);
    var valor = k.toLocaleTimeString();
 
    return valor;

  }

  obtenerDoctor(select:any){
    var id = Number(select);
    this.doctorService.getDoctorId(id).subscribe(res=>{
        console.log(res);
    }),[];   
  }

  obtenerPaciente(select:any){
    var id = Number(select)
    this.pacienteService.getPacienteId(id).subscribe(res=>{
      console.log(res);
    }),[];
  }
}
