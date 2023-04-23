import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { CurrentViewport } from '../current-viewport';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appGetCurrentVhHeight]',
})
export class GetCurrentVhHeightDirective implements OnInit, OnDestroy {
  @Output() appGetCurrentVhHeight = new EventEmitter<number>();

  destroy$ = new Subject();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private readonly currentViewport: CurrentViewport
  ) {}

  ngOnInit(): void {
    this.currentViewport.currentViewport$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const height =
          (100 * this.elementRef.nativeElement.clientHeight) /
          window.innerHeight;
        this.appGetCurrentVhHeight.emit(height);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
