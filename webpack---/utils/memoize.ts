export const memoize = (fn, timeoutInMs: number = 2000) => {
  const cache = new Map();

  return (...args: any[]) => {
    const serializedArgs = args.join(',');
    if (!cache.has(serializedArgs)) {
      const computed = fn(...args);

      cache.set(serializedArgs, computed);

      setTimeout(() => {
        cache.delete(serializedArgs);
      }, timeoutInMs);

      return computed;
    }

    return cache.get(serializedArgs);
  };
};
