import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadoresComponent } from './contadores.component';

describe('ContadoresComponent', () => {
  let component: ContadoresComponent;
  let fixture: ComponentFixture<ContadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContadoresComponent]
    });
    fixture = TestBed.createComponent(ContadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
