import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicDetailsComponent } from './basic-details.component';
import { BasicDetailsModule } from './basic-details.module';

describe('BasicDetailsModule', () => {
  //let basicDetailsModule: BasicDetailsModule;

  //////////////////mmouadh////////////////
  let component: BasicDetailsComponent;
  let fixture: ComponentFixture<BasicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
//////////////////////////////////////////////

  // beforeEach(() => {
  //   basicDetailsModule = new BasicDetailsModule();
  // });

  // it('should create an instance', () => {
  //   expect(basicDetailsModule).toBeTruthy();
  // });
});
