'use client';

import { useState } from 'react';

interface ModalHookProps {
  initialState?: boolean;
}

function useModal({ initialState = false }: ModalHookProps = {}) {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
}

export default useModal;
