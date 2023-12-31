import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { DestinoViaje } from '../models/destino-viaje.model';
import { fromEvent } from 'rxjs'
import { map, filter, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators'
import { AjaxResponse, ajax } from 'rxjs/ajax'

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})

export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>= new EventEmitter<DestinoViaje>();
  fg: FormGroup;
  minLongitud = 3;
  searchResults : string[];

  constructor(private fb: FormBuilder) {
     this.searchResults = [];
    //vinculacion con tag html
    this.fg = this.fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['']
    });
    
    //observador de tipeo
    this.fg.valueChanges.subscribe((form: any) =>{
      console.log('cambio el formulario: ', form);
    })
  }

  ngOnInit(){
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent<KeyboardEvent>(elemNombre, 'input')
    .pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(( ) => ajax('/assets/datos.json') )
    ).subscribe(AjaxResponse => {
      this.searchResults = AjaxResponse.response as string[];
    })
  }
  

  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }
  // En tu componente
convertToFormControl(absCtrl: AbstractControl | null): FormControl {
  const ctrl = absCtrl as FormControl;
  return ctrl;
}

nombreValidator(control: FormControl):{[s: string]:boolean} | null {
  const l = control.value.toString().trim().length;
  if (l > 0 && l < 5){
    return { invalidNombre: true };
  }
  return null;
}


nombreValidatorParametrizable(minLong: number): ValidatorFn {
  return (control: AbstractControl): { [s: string]: boolean } | null => {
    const l = control.value.toString().trim().length;
    if (l > 0 && l < minLong){
      return { minLongNombre: true };
    }
    return null;
  }
}



}