import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destinos-api-client.model';


@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.css']
})
export class ListaDestinoComponent implements OnInit {
  @Output() onItemAdded:EventEmitter<DestinoViaje>;
  //destinos: DestinoViaje[];
  updates: string[];
  constructor(private destinosApiClient:DestinosApiClient) { 
    this.onItemAdded = new EventEmitter();
    this.updates= [];
    this.destinosApiClient.subscribeOnChange((d: DestinoViaje | null) => {
      if (d != null){
        this.updates.push('Se ha elegido a ' + d.nombre)
      }
    });
  }

  ngOnInit() {
  }
  /*
  guardar(nombre:string, url:string):boolean {
    this.destinos.push(new DestinoViaje(nombre, url));
    //console.log(new DestinoViaje(nombre,url));
    //console.log(this.destinos);
    return false;
  }*/
  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(e: DestinoViaje){
    //desmarcar todos los demas en en array de elegidos
    //this.destinos.forEach(function (x) {x.setSelected(false); });
    //se marca el elegido
    //d.setSelected(true);
    //this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    //e.setSelected(true);
    this.destinosApiClient.elegir(e);
  }

  getAllDestinos() {
    return this.destinosApiClient.getAll();
  }

}