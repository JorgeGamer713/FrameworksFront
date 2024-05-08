import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorDialogComponent } from './contador-dialog.component';

describe('ContadorDialogComponent', () => {
  let component: ContadorDialogComponent;
  let fixture: ComponentFixture<ContadorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContadorDialogComponent]
    });
    fixture = TestBed.createComponent(ContadorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
