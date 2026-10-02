import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEntidadeComponent } from './login-entidade.component';

describe('LoginEntidadeComponent', () => {
  let component: LoginEntidadeComponent;
  let fixture: ComponentFixture<LoginEntidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginEntidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginEntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
