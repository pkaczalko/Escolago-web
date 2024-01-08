import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookFileComponent } from './add-book-file.component';

describe('AddBookFileComponent', () => {
  let component: AddBookFileComponent;
  let fixture: ComponentFixture<AddBookFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBookFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
