import { CurrentViewport } from './current-viewport';

describe('CurrentViewport', () => {
  let sut: CurrentViewport;
  beforeEach(() => {
    sut = new CurrentViewport();
  });

  it('#currentViewport should have value', () => {
    window.dispatchEvent(new Event('resize'));
    const expected = window.innerWidth;
    expect(sut.currentViewport).toEqual(expected);
  });

  it('#currentViewport$ should have value', () => {
    window.dispatchEvent(new Event('resize'));
    const expected = window.innerWidth;
    sut.currentViewport$.subscribe((result) => {
      expect(result).toEqual(expected);
    });
  });
});
