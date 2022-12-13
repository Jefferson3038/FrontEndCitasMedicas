import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctores';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-pacientes-doctores',
  templateUrl: './pacientes-doctores.component.html',
  styleUrls: ['./pacientes-doctores.component.css']
})
export class PacientesDoctoresComponent implements OnInit {
  doctor:Doctor= new Doctor();
  doctoresTabla:any = [];
  titulo:string;
  
  constructor(private doctorService:DoctorService, private router:Router){
  }


  ngOnInit(): void{
    this.onDataTable();
  }

  onDataTable(){
    this.doctorService.getDoctor("A").subscribe(res=>{
      this.doctoresTabla=res;
    });
    this.titulo="Doctores";
  }
  vistaAgregar(){
    this.router.navigate(['/Agregar-cita'])
  }

}
