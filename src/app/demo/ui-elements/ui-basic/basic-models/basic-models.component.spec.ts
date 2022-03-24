import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicModelsComponent } from './basic-models.component';

describe('BasicModelsComponent', () => {
  let component: BasicModelsComponent;
  let fixture: ComponentFixture<BasicModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
