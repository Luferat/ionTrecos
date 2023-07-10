import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FbpopulatePage } from './fbpopulate.page';

describe('FbpopulatePage', () => {
  let component: FbpopulatePage;
  let fixture: ComponentFixture<FbpopulatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FbpopulatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
