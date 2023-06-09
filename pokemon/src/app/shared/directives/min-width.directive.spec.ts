import { MinWidthDirective } from './min-width.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CurrentViewport } from '../current-viewport';
import { BehaviorSubject } from 'rxjs';

@Component({
  template: ` <div class="test-element" *appMinWidth="768"></div> `,
})
class HostComponent {}

describe('MinWidthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let currentWidth = new BehaviorSubject(1000);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinWidthDirective, HostComponent],
      providers: [
        {
          provide: CurrentViewport,
          useValue: jasmine.createSpyObj<CurrentViewport>(
            'CurrentViewport',
            {},
            {
              currentViewport: currentWidth.getValue(),
              currentViewport$: currentWidth,
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
      fixture.debugElement.queryAll(By.directive(MinWidthDirective))
    ).toBeTruthy();
  });

  it(`should show element when width is bigger than min widht`, () => {
    fixture = TestBed.createComponent(HostComponent);
    currentWidth.next(1000);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.test-element')).toBeTruthy();

    currentWidth.next(700);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.test-element')).toBeNull();
  });
});
