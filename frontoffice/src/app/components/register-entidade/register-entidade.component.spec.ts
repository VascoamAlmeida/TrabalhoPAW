import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEntidadeComponent } from './register-entidade.component';

describe('RegisterEntidadeComponent', () => {
  let component: RegisterEntidadeComponent;
  let fixture: ComponentFixture<RegisterEntidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEntidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterEntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
