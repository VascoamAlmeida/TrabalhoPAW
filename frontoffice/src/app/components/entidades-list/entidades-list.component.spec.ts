import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesListComponent } from './entidades-list.component';

describe('EntidadesListComponent', () => {
  let component: EntidadesListComponent;
  let fixture: ComponentFixture<EntidadesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntidadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
