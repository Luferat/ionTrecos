import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FblistPage } from './fblist.page';

describe('FblistPage', () => {
  let component: FblistPage;
  let fixture: ComponentFixture<FblistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FblistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
