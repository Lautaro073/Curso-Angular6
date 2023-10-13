import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importando ruteo
import { RouterModule, Routes } from '@angular/router';
//importando formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinoComponent } from './lista-destino/lista-destino.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import { DestinosViajesEffects, DestinosViajesState, intializeDestinosViajesState, reducerDestinosViajes } from './models/destinos-viajes-state.model';
import { ActionReducer } from '@ngrx/store';
import { StoreModule as NgrxStoreModule, ActionReducerMap } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';
// definiendo direcciones del nav

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: ListaDestinoComponent},
  { path: 'destino', component: DestinoDetalleComponent},
];

// redux init
export interface AppState{
  destinos : DestinosViajesState;
} 

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
  destinos: intializeDestinosViajesState()
}

// redux fin init

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinoComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), //registrando las rutas
    FormsModule, //agregar un formulario
    ReactiveFormsModule,
    NgrxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),

    EffectsModule.forRoot([DestinosViajesEffects])
  ],
  providers: [
    DestinosApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }