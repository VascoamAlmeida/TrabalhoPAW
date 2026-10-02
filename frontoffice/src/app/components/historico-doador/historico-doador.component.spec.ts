import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoDoadorComponent } from './historico-doador.component';

describe('HistoricoDoadorComponent', () => {
  let component: HistoricoDoadorComponent;
  let fixture: ComponentFixture<HistoricoDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoDoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
