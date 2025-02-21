// import { useEffect } from 'react';

// function useCloseOnOutsideClickAndEsc<T extends HTMLElement>(
//   ref: React.RefObject<T | null>,
//   callback: () => void,
// ) {
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         callback();
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [ref, callback]);
// }

// export default useCloseOnOutsideClickAndEsc;

import { useEffect } from 'react';

function useCloseOnOutsideClickAndEsc<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  callback: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, callback]);

  return null;
}

export default useCloseOnOutsideClickAndEsc;
