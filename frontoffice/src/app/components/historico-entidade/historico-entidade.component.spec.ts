import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoEntidadeComponent } from './historico-entidade.component';

describe('HistoricoEntidadeComponent', () => {
  let component: HistoricoEntidadeComponent;
  let fixture: ComponentFixture<HistoricoEntidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoEntidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoEntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
