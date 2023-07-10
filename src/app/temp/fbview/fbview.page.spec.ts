import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FbviewPage } from './fbview.page';

describe('FbviewPage', () => {
  let component: FbviewPage;
  let fixture: ComponentFixture<FbviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FbviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
