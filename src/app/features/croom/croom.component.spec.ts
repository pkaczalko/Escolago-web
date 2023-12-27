import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroomComponent } from './croom.component';

describe('CroomComponent', () => {
  let component: CroomComponent;
  let fixture: ComponentFixture<CroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CroomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
