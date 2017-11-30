import { Injectable } from '@angular/core'
import { HttpModule, Http, Response,RequestOptions, Headers } from '@angular/http';
import { Medicine } from '../models/medicines.model';

@Injectable()
export class MedicinesService {
    apiUrl="http://192.168.100.5:3000/";
    headers = new Headers();
    constructor(private http: Http){
        this.headers.append('auth','admin-auth');
    }

    getMedicines():Promise<Medicine[]>{
        return new Promise((resolve,reject) =>{
            this.http.get(
                this.apiUrl+'medicines_admin',new RequestOptions({
                    headers:this.headers
                }))
                .subscribe(
                res => {
                const medicines = res.json();
            resolve(medicines.medicines.map(medicine=>{
                return new Medicine(medicine.id,
                    medicine.name,
                    medicine.activeSubstance,
                    medicine.dose,
                    medicine.price,
                    medicine.stock
                    );
            }));
            },msg => {
                reject(msg);
            });
        });
    }
    saveMedicine(medicine:Medicine):Promise<Medicine[]>{
        return new Promise((resolve,reject)=>{
            this.http.post(this.apiUrl+'medicines',{
                name:medicine.name,
                dose:medicine.dose,
                activeSubstance:medicine.activeSubstance,
                price:medicine.price,
                stock:medicine.stock
            },new RequestOptions({headers:this.headers}))
            .subscribe(res=>{
                this.getMedicines().then(meds=>{
                    resolve(meds);
                }).catch(err=>{
                    reject(err);
                });
            },msg=>{
                reject(msg);
            });
        });
    }
    getTopMedicines():Promise<Medicine[]>{
        return new Promise((resolve,reject)=>{
            this.http.get(this.apiUrl+'graph/top_medicines', new RequestOptions({headers:this.headers}))
            .subscribe(res=>{
                resolve(res.json().medicines.map(med=>{
                    return new Medicine(
                        med.id,
                        med.name,
                        med.activeSubstance,
                        med.dose,0,
                        med.count);
                }));
            },msg=>{
                reject(msg);
            })
        });
    }
    getTopMedicinesMonth():Promise<Medicine[]>{
        return new Promise((resolve,reject)=>{
            this.http.get(this.apiUrl+'graph/top_medicines_current_month', new RequestOptions({headers:this.headers}))
            .subscribe(res=>{
                resolve(res.json().medicines.map(med=>{
                    return new Medicine(
                        med.id,
                        med.name,
                        med.activeSubstance,
                        med.dose,0,
                        med.count);
                }));
            },msg=>{
                reject(msg);
            })
        });
    }
}
