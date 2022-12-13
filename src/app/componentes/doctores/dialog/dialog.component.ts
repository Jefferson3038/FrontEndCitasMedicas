import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Doctor } from 'src/app/models/doctores';
import { CitasService } from 'src/app/Services/citas.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  validacionCitas:any=[];

  constructor(private doctorService:DoctorService,private userService:UsuarioService, 
    private citasService:CitasService,public dialogRef:MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public doctor:Doctor) {   
   }
   
  ngOnInit(): void {
    this.citasService.getCita("A").subscribe(res=>{
      this.validacionCitas=res;
    });
  }

  onUpdateDoctor(doctor:Doctor):void{
    this.doctorService.updateDoctor(doctor.DocCodigo, doctor).subscribe(res => {
      if(res){
        Swal.fire("Actualizado",'Se ha actualizado el doctor '+this.doctor.DocNombre+' '+this.doctor.DocApellido+' de manera exitosa','success')
        this.cerrarDialog();
        this.clear();
      } else {
        alert('Error!')
      }
    })
  }

  clear(){
    this.doctor.DocCodigo=0;
    this.doctor.DocNombre="";
    this.doctor.DocApellido="";
    this.doctor.DocTelefono="";
    this.doctor.DocEmail="";
    this.doctor.DocEspecialidades="";
    this.doctor.UserCodigo="";
  }

  onDeleteDoctor(doctor:Doctor){
    if (this.validacionEliminar(doctor.DocCodigo)){
      this.eliminar(doctor)
    }
    else if(this.validacionEliminar(doctor.DocCodigo)==false){
      Swal.fire("Error","No se puede borrar este doctor, porque esta asignado a una cita","error")
    }
  }

  eliminar(doctor:Doctor):void{
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Este elemento sera eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, mantener'
    }).then((result)=>{
      if(result.value){
        this.userService.deleteUsuarios(doctor.DocCodigo).subscribe(res=>{
          if (res){
            console.log(res)
          }
          else{
            alert('Error!')
          }
        });
        this.doctorService.deleteDoctor(doctor.DocCodigo).subscribe(res => {
          if(res){
            this.clear();
            this.cerrarDialog();
            Swal.fire("Eliminado",'Se ha eliminado el doctor '+this.doctor.DocNombre+' '+this.doctor.DocApellido+' de manera exitosa','success')
          } else {
            alert('Error!')
          }
        });
     }});
    }
    
  
  
  cerrarDialog():void{
    this.dialogRef.close();
  }

  validacionEliminar(id:number){
    let validacion:boolean=true;
    let valor:number=0;
    for(let item of this.validacionCitas){
       valor = item.docCodigo
      if(valor==id){
        validacion=false;
        break;
      }
    }
    return validacion
  }
}
