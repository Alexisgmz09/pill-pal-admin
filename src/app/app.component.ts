import { Component } from '@angular/core';
import { Medicine } from '../models/medicines.model';
import { OnInit } from '@angular/core';
import { MedicinesService } from '../services/medicines.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  medicines:Medicine[] =[];
  name:string;
  activeSubstance:string;
  dose:string;
  price:number;
  stock:number;
  constructor(private medServ:MedicinesService){}
  ngOnInit(){
    this.getMedicines();
  }
  getMedicines():void{
    this.medServ.getMedicines().then(meds=>{
      this.medicines= meds;
    }).catch(err=>{
      console.log(err);
    })
  }
  addMedicine(form:NgForm):void{
    let medicine=new Medicine("",this.name,this.activeSubstance,this.dose,this.price,this.stock);
    this.medServ.saveMedicine(medicine).then(res=>{
      this.medicines = res;
      form.reset();
    }).catch(err=>{
      console.log(err);
    })
  }
}
