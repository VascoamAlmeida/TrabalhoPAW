import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEntidadeComponent } from './profile-entidade.component';

describe('ProfileEntidadeComponent', () => {
  let component: ProfileEntidadeComponent;
  let fixture: ComponentFixture<ProfileEntidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEntidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileEntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
