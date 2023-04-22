import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

class CurrentViewportObservable {
  private _subject$: BehaviorSubject<number>;

  constructor() {
    this._subject$ = new BehaviorSubject(window.innerWidth);

    fromEvent(window, 'resize').subscribe(() => {
      this._subject$.next(window.innerWidth);
    });
  }

  get currentViewport$(): Observable<number> {
    return this._subject$.asObservable().pipe(distinctUntilChanged());
  }

  get currentViewport(): number {
    return this._subject$.getValue();
  }
}

export const currentViewportObservable = new CurrentViewportObservable();
