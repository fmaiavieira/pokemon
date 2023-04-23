import { Component } from '@angular/core';
import { GetCurrentVhHeightDirective } from './get-current-vh-height.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CurrentViewport } from '../current-viewport';
import { of } from 'rxjs';

@Component({
  template: `
    <div
      [style]="{ height: '10vh' }"
      (appGetCurrentVhHeight)="currentHeight = $event"
    ></div>
  `,
})
class HostComponent {
  currentHeight: number = 15;
}

describe('GetCurrentHeightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let currentWidth = 1000;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetCurrentVhHeightDirective, HostComponent],
      providers: [
        {
          provide: CurrentViewport,
          useValue: jasmine.createSpyObj<CurrentViewport>(
            'CurrentViewport',
            {},
            {
              currentViewport: currentWidth,
              currentViewport$: of(currentWidth),
            }
          ),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an component', () => {
    expect(
      fixture.debugElement.queryAll(By.directive(GetCurrentVhHeightDirective))
    ).toBeTruthy();
  });

  it('should return current height', () => {
    const expected =
      (100 * fixture.nativeElement.clientHeight) / window.innerHeight;
    fixture.detectChanges();

    expect(component.currentHeight).toEqual(expected);
  });
});
