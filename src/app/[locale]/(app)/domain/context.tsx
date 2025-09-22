'use client';
import { getAllDomainSuffix } from '@/apis/domain';
import { DomainSuffixRecord } from '@/apis/domain/types';
import { useRequest } from 'ahooks';
import React, { createContext, useContext, useState } from 'react';

const DomainContext = createContext<{
  suffix_list: DomainSuffixRecord[];
  loading: boolean;
} | null>(null);

const DomainProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [suffixList, setSuffixList] = useState<DomainSuffixRecord[]>([]);

  const { loading } = useRequest(getAllDomainSuffix, {
    onSuccess: (res) => {
      setSuffixList(res.data);
    },
  });

  return (
    <DomainContext.Provider
      value={{
        suffix_list: suffixList,
        loading,
      }}
    >
      {children}
    </DomainContext.Provider>
  );
};

const useDomain = () => {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error('useDomain must be used within the context');
  }
  return context;
};

export { DomainProvider, useDomain };
