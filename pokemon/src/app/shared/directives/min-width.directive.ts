import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription, of } from 'rxjs';
import { CurrentViewport } from '../current-viewport';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[appMinWidth]',
})
export class MinWidthDirective implements OnDestroy {
  @Input() appMinWidth: number = 0;

  subscription?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private changeDetector: ChangeDetectorRef,
    private currentViewport: CurrentViewport
  ) {}

  ngOnInit(): void {
    this.subscription = this.currentViewport.currentViewport$
      .pipe(
        switchMap((width) => of(width < this.appMinWidth)),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        value ? this.hide() : this.show();
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  hide(): void {
    this.viewContainer.clear();
  }

  show(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.changeDetector.markForCheck();
  }
}
