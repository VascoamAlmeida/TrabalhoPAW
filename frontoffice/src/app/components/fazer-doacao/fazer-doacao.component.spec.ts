import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerDoacaoComponent } from './fazer-doacao.component';

describe('FazerDoacaoComponent', () => {
  let component: FazerDoacaoComponent;
  let fixture: ComponentFixture<FazerDoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazerDoacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FazerDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
