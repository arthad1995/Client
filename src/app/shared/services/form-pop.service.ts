import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assignment} from '../models/Assignment';

@Injectable({
  providedIn: 'root'
})
export class FormPopService {

  constructor() { }
  form:FormGroup = new FormGroup({

    tittle: new FormControl(''),
    description: new FormControl(''),
    duedate: new FormControl(''),
  });



  populateForm(assignment:Assignment){
    this.form.setValue(assignment);
  }
}
