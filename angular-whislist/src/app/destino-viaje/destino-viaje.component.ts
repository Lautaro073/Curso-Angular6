import { Component, OnInit,  Input,HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent {
  @Input() destino!: DestinoViaje;
  @Input() position!: number;
  @HostBinding('attr.class') cssClass = 'col-md-4'
  @Output() clicked: EventEmitter<DestinoViaje> = new EventEmitter<DestinoViaje>();
     constructor(){
     
     }

     ngOnInit(){

     }
     ir(){
      this.clicked.emit(this.destino);
      return false;
     }
}
