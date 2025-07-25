import { delay } from './';

jest.useFakeTimers();

describe('delay utility', () => {
  it('returns a Promise that resolves after the given time', async () => {
    const thenFn = jest.fn();

    delay(1000).then(thenFn);

    expect(thenFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    await Promise.resolve();

    expect(thenFn).toHaveBeenCalled();
  });
});
