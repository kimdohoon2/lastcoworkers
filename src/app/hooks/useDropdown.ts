import { useState } from 'react';

function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<string | null>(null);

  const toggleDropdown = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const selectItem = (item: string) => {
    setCurrentItem(item);
    setIsOpen(false);
  };

  return { isOpen, toggleDropdown, closeDropdown, currentItem, selectItem };
}
export default useDropdown;
