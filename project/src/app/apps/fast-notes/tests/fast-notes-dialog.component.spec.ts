import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastNotesDialogComponent } from '../fast-notes-dialog/fast-notes-dialog.component';

describe('FastNotesDialogComponent', () => {
  let component: FastNotesDialogComponent;
  let fixture: ComponentFixture<FastNotesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastNotesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
