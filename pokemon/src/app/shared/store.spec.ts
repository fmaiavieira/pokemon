import { Store } from './store';

interface MyState {
  loading: boolean;
  data: string[];
}

class MyStore extends Store<MyState> {
  protected initialState(): MyState {
    return {
      loading: false,
      data: [],
    };
  }
}

describe('Stores: base store', () => {
  let store: MyStore;

  beforeEach(() => {
    store = new MyStore();
  });

  it('should emit initial state', (done) => {
    store.subscribe((state) => {
      expect(state).toEqual(store.state);
      done();
    });
  });

  it('should update the state value', () => {
    store.mutate({ loading: true });

    expect(store.state.loading).toBe(true);
  });

  it('should reset the state', () => {
    store.mutate({ loading: true });
    expect(store.state.loading).toBe(true);

    store.reset();
    expect(store.state.loading).toBe(false);
  });

  it('should get state', () => {
    store.mutate({ loading: true });
    expect(store.state.loading).toBe(true);

    store.state$.subscribe((res) => {
      expect(res.loading).toBe(true);
    });
  });
});
