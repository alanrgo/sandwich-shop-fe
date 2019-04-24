import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SandwichComponent } from './sandwich.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomSandwichPayload } from './custom-sandwich';

describe('SandwichComponent', () => {
  let component: SandwichComponent;
  let fixture: ComponentFixture<SandwichComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      declarations: [ SandwichComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandwichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tab value is set to false when custom is clicked', () => {
    component.onTabSelect('custom');
    expect(component.menuTabActive).toBe(false);
  });

  it('tab value is set to true when tab menu is clicked', () => {
    component.onTabSelect('menu');
    expect(component.menuTabActive).toBe(true);
  });

  it('should call getSandwichList from Service', () => {
    const spy = jest.spyOn(component.sandwichService, 'getSandwichList');
    component.getSandwichList();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call getSandwichPrice from Service', () => {
    component.customSandwich = new CustomSandwichPayload(1, 1, 1, 1, 1);
    const spy = jest.spyOn(component.sandwichService, 'getSandwichPrice');
    component.getSandwichPrice();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(component.customSandwich, 1.0);
  });

  it('should call getSandwichList and getSandwichPrice from Service after updating inflation', () => {
    const spy = jest.spyOn(component.sandwichService, 'getSandwichList');
    const spy2 = jest.spyOn(component.sandwichService, 'getSandwichPrice');
    component.setInflation('1.2');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(component.customSandwich, 1.2);
  });
});
