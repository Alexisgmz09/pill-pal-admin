import { Component } from '@angular/core';
import { Medicine } from '../models/medicines.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  medicines:Medicine[] =[];
  medicine:Medicine;
  constructor(private medServ)
  ngOnInit(){

  }
}
