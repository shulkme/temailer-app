'use client';
import { getAllDomains } from '@/apis/domain';
import { DomainRecord } from '@/apis/domain/types';
import { EMAIL_CHANNEL_TYPE_ENUM } from '@/apis/email/enums';
import { useRequest, useSetState } from 'ahooks';
import { SetState } from 'ahooks/es/useSetState';
import React, { createContext, useContext, useState } from 'react';

export interface EmailAddressRecord {
  name: string;
  domain: string;
  channel: EMAIL_CHANNEL_TYPE_ENUM;
}

const InboxContext = createContext<{
  loading?: boolean;
  currentChannel: EMAIL_CHANNEL_TYPE_ENUM;
  setCurrentChannel: (channel: EMAIL_CHANNEL_TYPE_ENUM) => void;
  tempDomains: DomainRecord[];
  eduDomains: DomainRecord[];
  currentEmails: Record<EMAIL_CHANNEL_TYPE_ENUM, EmailAddressRecord | null>;
  setCurrentEmails: SetState<
    Record<EMAIL_CHANNEL_TYPE_ENUM, EmailAddressRecord | null>
  >;
} | null>(null);

const InboxProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [tempDomains, setTempDomains] = useState<DomainRecord[]>([]);
  const [eduDomains, setEduDomains] = useState<DomainRecord[]>([]);
  const [currentChannel, setCurrentChannel] = useState(
    EMAIL_CHANNEL_TYPE_ENUM.TEMP,
  );
  const [currentEmails, setCurrentEmails] = useSetState<
    Record<EMAIL_CHANNEL_TYPE_ENUM, EmailAddressRecord | null>
  >({
    [EMAIL_CHANNEL_TYPE_ENUM.TEMP]: null,
    [EMAIL_CHANNEL_TYPE_ENUM.EDU]: null,
    [EMAIL_CHANNEL_TYPE_ENUM.GMAIL]: null,
    [EMAIL_CHANNEL_TYPE_ENUM.OUTLOOK]: null,
    [EMAIL_CHANNEL_TYPE_ENUM.ICLOUD]: null,
    [EMAIL_CHANNEL_TYPE_ENUM.GMX]: null,
    [EMAIL_CHANNEL_TYPE_ENUM.YAHOO]: null,
    [EMAIL_CHANNEL_TYPE_ENUM.MAIL]: null,
  });

  const { loading } = useRequest(getAllDomains, {
    onSuccess: (res) => {
      console.log(res.data);
      setTempDomains(res.data);
    },
  });

  return (
    <InboxContext.Provider
      value={{
        loading,
        tempDomains,
        eduDomains,
        currentEmails,
        setCurrentEmails,
        currentChannel,
        setCurrentChannel,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
};

const useInbox = () => {
  const context = useContext(InboxContext);
  if (!context) {
    throw new Error('useInbox must be used within the context');
  }
  return context;
};

export { InboxProvider, useInbox };
