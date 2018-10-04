import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastNotesComponent } from '../fast-notes.component';

describe('FastNotesComponent', () => {
  let component: FastNotesComponent;
  let fixture: ComponentFixture<FastNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
