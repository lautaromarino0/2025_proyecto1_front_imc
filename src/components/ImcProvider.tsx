import React from 'react'
import { createContext, useState } from 'react';
import { ImcContextType } from '../interfaces/ImcContextType.interface';
import { ImcResult } from '../interfaces/ImcResult.interface';

export const ImcContext = createContext<ImcContextType | undefined>(undefined);

export const ImcProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resultado, setResultado] = useState<ImcResult | null>(null);
  const [error, setError] = useState<string>('');

  return (
    <ImcContext.Provider value={{ resultado, setResultado, error, setError }}>
      {children}
    </ImcContext.Provider>
  )
}