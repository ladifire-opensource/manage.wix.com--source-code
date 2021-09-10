import { ServiceFactory } from '@services/types';
import { Timestamp } from './timestamp.types';

/**
 * This service is intended to allow testing code that does calculations based on the current date.
 * Usually such a code is very problematic to test, because in order to match the expectations in the test
 * one have to mock Date.now function with different values per call.
 * Date.now function, in turn, might be used by any library including the testing library itself.
 * Thus, instead of using Date.now directly, the code will use this service which can be mocked in the test.
 * This will promise that only your code uses mocked version and the libraries continue using the real Date.now.
 */
export const timestamp: ServiceFactory<Timestamp> = () => {
  return {
    now: () => Date.now(),
    relativeNow: () => Math.round(window.performance.now()),
  };
};
