import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListallPage } from './listall.page';

describe('ListallPage', () => {
  let component: ListallPage;
  let fixture: ComponentFixture<ListallPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
