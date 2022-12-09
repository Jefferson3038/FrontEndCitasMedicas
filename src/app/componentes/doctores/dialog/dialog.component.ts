import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Doctor } from 'src/app/models/doctores';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  constructor(private doctorService:DoctorService,private userService:UsuarioService, public dialogRef:MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public doctor:Doctor) {   
   }
   
  ngOnInit(): void {
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

  onDeleteDoctor(select:any):void{
    this.userService.deleteUsuarios(select.docCodigo).subscribe(res=>{
      if (res){
        console.log(res)
      }
      else{
        alert('Error!')
      }
    });
    this.doctorService.deleteDoctor(select.docCodigo).subscribe(res => {
      if(res){
        this.clear();
        this.cerrarDialog();
        Swal.fire("Eliminado",'Se ha eliminado el doctor '+this.doctor.DocNombre+' '+this.doctor.DocApellido+' de manera exitosa','success')
      } else {
        alert('Error!')
      }
    });
  }
  
  cerrarDialog():void{
    this.dialogRef.close();
  }
}
