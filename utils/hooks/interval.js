import { useEffect, useRef } from 'react';

/**
 * Executes the callback every `delay` milliseconds. Preserves the 
 * remaining delay time between rerenders and clears it when the component unmounts.
 * Mostly a copy of: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @function
 * 
 * @param {Function} callback - the function to run after delay has elapsed
 * @param {Number} delay - the delay between callbacks. If null, will temporarily pause the interval. You can change this value at any time.
 * @returns {void}
 */
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [ callback ]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }

    // if delay is null, just don't setup an interval at all (for pausing)
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [ delay ]);
}