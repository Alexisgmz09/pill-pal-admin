import { Component, ViewChild } from '@angular/core';
import { Medicine } from '../models/medicines.model';
import { OnInit } from '@angular/core';
import { MedicinesService } from '../services/medicines.service';
import { NgForm } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('topSale') topsalecanvas;
  @ViewChild('topMonth') topmonthcanvas;
  medicines:Medicine[] =[];
  name:string;
  activeSubstance:string;
  dose:string;
  price:number;
  stock:number;
  topSale:any;
  topMonth:any;
  constructor(private medServ:MedicinesService){}
  ngOnInit(){
    this.getMedicines();
    this.getGraphSale();
    this.getMonthGraphSale();
    
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
  getGraphSale(){
    this.medServ.getTopMedicines().then(res=>{
      this.topSale = new Chart(this.topsalecanvas.nativeElement,{
        type: 'pie',
        data: {
          datasets: [{
              data: res.map(med=>{
                return med.stock;
              }),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 90, 0.2)',
                'rgba(120, 99, 150, 0.2)',
                'rgba(153, 102, 120, 0.2)'
            ],
              label: 'Top Sales'
          }],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: res.map(med=>{
            return med.name+" "+(med.activeSubstance)+" ["+med.dose+"]"
          })
        }
      });
    }).catch(err=>{
      console.log(err);
    })
  }
  getMonthGraphSale(){
    this.medServ.getTopMedicines().then(res=>{
      console.log(res);
      this.topMonth = new Chart(this.topmonthcanvas.nativeElement,{
        type: 'pie',
        data: {
          datasets: [{
              data: res.map(med=>{
                return med.stock;
              }),
              backgroundColor: [
                'rgba(255, 99, 90, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(120, 99, 150, 0.2)',
                'rgba(153, 102, 120, 0.2)'
            ],
              label: 'Top Sales'
          }],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: res.map(med=>{
            return med.name+" "+(med.activeSubstance)+" ["+med.dose+"]"
          })
        }
      });
    }).catch(err=>{
      console.log(err);
    })
  }
}
