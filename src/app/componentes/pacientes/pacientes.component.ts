import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pacientes } from 'src/app/models/pacientes';
import { PacientesService } from 'src/app/Services/pacientes.service';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import { ActualizarPacienteComponent } from './actualizar-paciente/actualizar-paciente.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/Services/citas.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  paciente:Pacientes = new Pacientes();
  datatable:any = [];
  titulo:string;
  validacionCitas:any=[];
  
  constructor(private router:Router,private pacienteService:PacientesService, 
    private citasService:CitasService,private userService:UsuarioService,private dialog?:MatDialog){
  }


  ngOnInit(): void{
    this.onDataTable();
  }

  openDialog(): void {
    if(this.dialog){
      const dialogRef = this.dialog.open(ActualizarPacienteComponent, {
      width: '50%',
      data: this.paciente
      });
      dialogRef.afterClosed().subscribe(
        res=>{
          this.onDataTable()
          console.log(res)
        }
      )
    }
  }

  onRestaurar(select:any):void{
    this.pacienteService.updatePaciente(select.pacCodigo, select).subscribe(res => {
      if(res){
        Swal.fire("Restaurado",'Se ha restaurado el paciente '+select.pacNombre+' '+select.pacApellido+' de manera exitosa','success')
        this.clear();
        this.onDataTableEliminados();
      } else {
        alert('Error!')
      }
    })
  }

  onDataTable(){
    this.pacienteService.getPaciente("A").subscribe(res=>{
      this.datatable=res;
      console.log(res);
    });
    this.citasService.getCita("A").subscribe(res=>{
      this.validacionCitas=res;
    });
    this.titulo="Pacientes";
  }

  onDataTableEliminados(){
    this.pacienteService.getPaciente("D").subscribe(res=>{
      this.datatable=res;
      console.log(res);
    });
    this.titulo="Pacientes eliminados";
  }
  
  onDelete(select:any){
    if (this.validacionEliminar(select.pacCodigo)){
      this.eliminar(select)
    }
    else if(this.validacionEliminar(select.pacCodigo)==false){
      Swal.fire("Error","No se puede borrar este paciente, porque esta asignado a una cita","error")
    }
  }

  eliminar(select:any):void{
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Este elemento sera eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, mantener'
    }).then((result)=>{
      if(result.value){
        this.userService.deleteUsuarios(select.userCodigo).subscribe(res=>{
          if (res){
            console.log(res)
          }
          else{
            alert('Error!')
          }
        });
        this.pacienteService.deletePaciente(select.pacCodigo).subscribe(res => {
          if(res){
            Swal.fire("Eliminado",'Se ha eliminado el paciente '+this.paciente.PacNombre+' '+this.paciente.PacApellido+' de manera exitosa','success')
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

  validacionEliminar(id:number){
    let validacion:boolean=true;
    let valor:number=0;
    for(let item of this.validacionCitas){
       valor = item.pacCodigo
      if(valor==id){
        validacion=false;
        break;
      }
    }
    return validacion
  }

  onSetData(select:any){
    this.paciente.PacCodigo=select.pacCodigo;
    this.paciente.PacNombre=select.pacNombre;
    this.paciente.PacApellido=select.pacApellido;
    this.paciente.PacTelefono=select.pacTelefono;
    this.paciente.PacEmail=select.pacEmail;
    this.paciente.PacFechaNacimiento=select.pacFechaNacimiento;
    this.paciente.UserCodigo=select.userCodigo;
    this.paciente.PacDireccion=select.pacDireccion;
    this.openDialog();
  }

  clear(){
    this.paciente.PacCodigo=0;
    this.paciente.PacNombre="";
    this.paciente.PacApellido="";
    this.paciente.PacTelefono="";
    this.paciente.PacEmail="";
    this.paciente.PacFechaNacimiento= new Date();
    this.paciente.UserCodigo=0;
    this.paciente.PacDireccion="";
  }
  vistaAgregar(){
    this.router.navigate(["/Agregar-paciente"]);
  }
}
