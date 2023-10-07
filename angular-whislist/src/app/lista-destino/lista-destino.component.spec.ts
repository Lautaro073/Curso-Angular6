import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDestinoComponent } from './lista-destino.component';

describe('ListaDestinoComponent', () => {
  let component: ListaDestinoComponent;
  let fixture: ComponentFixture<ListaDestinoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDestinoComponent]
    });
    fixture = TestBed.createComponent(ListaDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
