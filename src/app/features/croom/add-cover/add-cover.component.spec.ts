import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoverComponent } from './add-cover.component';

describe('AddCoverComponent', () => {
  let component: AddCoverComponent;
  let fixture: ComponentFixture<AddCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
