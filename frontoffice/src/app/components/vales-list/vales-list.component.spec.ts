import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValesListComponent } from './vales-list.component';

describe('ValesListComponent', () => {
  let component: ValesListComponent;
  let fixture: ComponentFixture<ValesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
