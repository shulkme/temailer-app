'use client';
import { getAllDomains } from '@/apis/domain';
import { DomainRecord } from '@/apis/domain/types';
import { EMAIL_CHANNEL_TYPE_ENUM } from '@/apis/email/enums';
import { useRequest, useSetState } from 'ahooks';
import { SetState } from 'ahooks/es/useSetState';
import { draw, uid } from 'radash';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const InboxContext = createContext<{
  loading?: boolean;
  currentChannel: EMAIL_CHANNEL_TYPE_ENUM;
  setCurrentChannel: (channel: EMAIL_CHANNEL_TYPE_ENUM) => void;
  domains: DomainRecord[];
  currentEmails: Record<string, string | null>;
  setCurrentEmails: SetState<Record<string, string | null>>;
  randomEmail: (type: EMAIL_CHANNEL_TYPE_ENUM) => string | null;
  currentEmail: string | null;
} | null>(null);

const InboxProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [domains, setDomains] = useState<DomainRecord[]>([]);
  const [currentChannel, setCurrentChannel] = useState(
    EMAIL_CHANNEL_TYPE_ENUM.TEMP,
  );
  const [currentEmails, setCurrentEmails] = useSetState<
    Record<string, string | null>
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

  const currentEmail = useMemo(() => {
    return currentEmails?.[currentChannel];
  }, [currentChannel, currentEmails]);

  const randomEmail = useCallback(
    (type: EMAIL_CHANNEL_TYPE_ENUM) => {
      const list = domains
        .filter((f) => f.provider_type === type)
        .map((f) => f.name);
      const domain = draw(list);
      const name = uid(5).toLowerCase();
      if (domain) return [name, domain].join('@');
      return null;
    },
    [domains],
  );

  const { loading } = useRequest(getAllDomains, {
    onSuccess: (res) => {
      setDomains(res.data);
    },
  });

  useEffect(() => {
    // init
    if (domains.length > 0) {
      setCurrentEmails({
        [EMAIL_CHANNEL_TYPE_ENUM.TEMP]: randomEmail(
          EMAIL_CHANNEL_TYPE_ENUM.TEMP,
        ),
        [EMAIL_CHANNEL_TYPE_ENUM.EDU]: randomEmail(EMAIL_CHANNEL_TYPE_ENUM.EDU),
      });
    }
  }, [domains]);

  return (
    <InboxContext.Provider
      value={{
        loading,
        domains,
        currentEmails,
        setCurrentEmails,
        currentChannel,
        setCurrentChannel,
        randomEmail,
        currentEmail,
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
