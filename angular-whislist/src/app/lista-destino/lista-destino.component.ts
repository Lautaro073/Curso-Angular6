import { Component } from '@angular/core';
import { DestinoViaje } from 'src/models/destino-viaje.models';

@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.css']
})
export class ListaDestinoComponent {
  destinos: DestinoViaje[];
  constructor(){
   this.destinos = [];

  }

  ngOnInit(){

  }
  guardar(nombre:string, url:string):boolean {
    this.destinos.push(new DestinoViaje(nombre, url))
    
   
    return false;

  }
}
