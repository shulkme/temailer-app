'use client';
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';

const TitleContext = createContext<{
  title?: string;
  setTitle: (title?: string) => void;
} | null>(null);

const TitleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [title, setTitle] = useState<string>();
  return (
    <TitleContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      {children}
    </TitleContext.Provider>
  );
};

const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error('useTitle must be used within the TitleProvider');
  }
  return context;
};

const Title: React.FC<{ title: string }> = ({ title }) => {
  const { setTitle } = useTitle();
  useLayoutEffect(() => {
    setTitle(title);
  }, [title]);
  return null;
};

export { Title, TitleProvider, useTitle };
