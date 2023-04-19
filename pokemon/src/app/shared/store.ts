import { BehaviorSubject } from 'rxjs';

export abstract class Store<T> {
  protected _subject = new BehaviorSubject<T>(this.initialState());

  protected abstract initialState(): T;

  get state(): T {
    return this._subject.getValue();
  }

  get state$() {
    return this._subject.asObservable();
  }

  subscribe(
    next: (state: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ) {
    return this._subject.subscribe({
      next: next,
      error: error,
      complete: complete,
    });
  }

  mutate(newState: Partial<T>): void {
    this._subject.next({
      ...this.state,
      ...newState,
    });
  }

  reset() {
    this._subject.next(this.initialState());
  }
}
