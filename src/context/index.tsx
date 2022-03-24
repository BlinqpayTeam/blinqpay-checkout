import React, { createContext, FC, useState } from 'react';
import { PaymentContextType, PaymentMethod } from '../types';

const PaymentMethodContext = createContext<PaymentContextType | undefined>(undefined);

const PaymentMethodProvider: FC = ({ children }) => {
  const [selectedMethods, setSelectedMethods] = useState<PaymentMethod[]>([]);
  return (
    <PaymentMethodContext.Provider value={{ selectedMethods, setSelectedMethods }}>
      {children}
    </PaymentMethodContext.Provider>
  );
};

export { PaymentMethodProvider, PaymentMethodContext };
