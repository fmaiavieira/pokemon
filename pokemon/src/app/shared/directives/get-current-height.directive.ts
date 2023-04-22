import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { currentViewportObservable } from '../current-viewport';

@Directive({
  selector: '[appGetCurrentHeight]',
})
export class GetCurrentHeightDirective implements OnInit, OnDestroy {
  @Output() appGetCurrentHeight = new EventEmitter<number>();

  destroy$ = new Subject();

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    currentViewportObservable.currentViewport$.subscribe(() => {
      const height =
        (100 * this.elementRef.nativeElement.clientHeight) / window.innerHeight;
      this.appGetCurrentHeight.emit(height);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
