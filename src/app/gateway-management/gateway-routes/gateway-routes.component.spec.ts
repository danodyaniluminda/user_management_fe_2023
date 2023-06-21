import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayRoutesComponent } from './gateway-routes.component';

describe('GatewayRoutesComponent', () => {
  let component: GatewayRoutesComponent;
  let fixture: ComponentFixture<GatewayRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayRoutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
