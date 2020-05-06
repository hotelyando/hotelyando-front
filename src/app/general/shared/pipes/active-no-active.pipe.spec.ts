import { ActiveNoActivePipe } from './active-no-active.pipe';

describe('ActiveNoActivePipe', () => {
  it('create an instance', () => {
    const pipe = new ActiveNoActivePipe();
    expect(pipe).toBeTruthy();
  });
});
