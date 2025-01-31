'use client';

import { Provider } from 'react-redux';
<<<<<<< HEAD
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/app/stores/store';
import { ReactNode } from 'react';

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
=======
import { store } from '../stores/tasksStore';

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
>>>>>>> 0979d81e461e5f8e4ab845bbc7d0ca0b0ea89d39
