import { useEffect, useState, useRef } from 'react';

const useSaveScroll = (storageKey: string) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const attemptRestore = () => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) {
        setTimeout(attemptRestore, 50);
        return;
      }

      const savedScrollLeft = sessionStorage.getItem(storageKey);
      if (savedScrollLeft !== null) {
        scrollContainer.scrollLeft = parseFloat(savedScrollLeft);
      }

      sessionStorage.setItem(storageKey, String(scrollContainer.scrollLeft));
    };

    attemptRestore();
  }, [isMounted, storageKey]);

  useEffect(() => {
    if (!isMounted) return;

    const registerScrollListener = () => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) {
        setTimeout(registerScrollListener, 50);
        return;
      }

      const handleScroll = () => {
        if (scrollRef.current) {
          sessionStorage.setItem(
            storageKey,
            String(scrollRef.current.scrollLeft),
          );
        }
      };

      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.addEventListener('scroll', handleScroll);

      // eslint-disable-next-line consistent-return
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    };

    // eslint-disable-next-line consistent-return
    return registerScrollListener();
  }, [isMounted, storageKey]);

  return scrollRef;
};

export default useSaveScroll;
