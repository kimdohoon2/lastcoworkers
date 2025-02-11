import { useEffect, useRef } from 'react';

const useSaveScroll = (storageKey: string) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return undefined;

    // 기존 스크롤 위치 복구
    const savedScrollLeft = sessionStorage.getItem(storageKey);
    if (savedScrollLeft) {
      scrollContainer.scrollLeft = parseFloat(savedScrollLeft);
    }

    // 스크롤 이벤트 감지해서 위치 저장
    const handleScroll = () => {
      if (scrollRef.current) {
        sessionStorage.setItem(
          storageKey,
          scrollRef.current.scrollLeft.toString(),
        );
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [storageKey]);

  return scrollRef;
};

export default useSaveScroll;
