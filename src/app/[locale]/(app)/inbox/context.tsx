'use client';
import { getAllDomains } from '@/apis/domain';
import { DomainRecord } from '@/apis/domain/types';
import { getEmailAddress } from '@/apis/email';
import { EMAIL_CHANNEL_TYPE_ENUM } from '@/apis/email/enums';
import { useRequest, useSetState } from 'ahooks';
import { SetState } from 'ahooks/es/useSetState';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
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
  isImapEmail: boolean;
  nextRetryTime?: string;
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

  const [nextRetryTime, setNextRetryTime] = useState<string>();

  const currentEmail = useMemo(() => {
    return currentEmails?.[currentChannel];
  }, [currentChannel, currentEmails]);

  const isImapEmail = useMemo(() => {
    return (
      currentChannel !== EMAIL_CHANNEL_TYPE_ENUM.TEMP &&
      currentChannel !== EMAIL_CHANNEL_TYPE_ENUM.EDU
    );
  }, [currentChannel]);

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

  const { loading: addressLoading, run: genAddress } = useRequest(
    getEmailAddress,
    {
      manual: true,
      onSuccess: (res, params) => {
        const email = res.data;
        const [provider] = params;
        setCurrentEmails({
          [provider]: email,
        });
      },
      onError: (e) => {
        const headers = (e as unknown as AxiosResponse).headers;
        const second = +headers['retry-after'];
        if (second > 0) {
          setNextRetryTime(
            dayjs().add(second, 'second').format('YYYY-MM-DD HH:mm'),
          );
        } else {
          setNextRetryTime(undefined);
        }
      },
    },
  );

  const { loading: domainLoading } = useRequest(getAllDomains, {
    onSuccess: (res) => {
      setDomains(res.data);
    },
  });

  const loading = useMemo(() => {
    return domainLoading || addressLoading;
  }, [addressLoading, domainLoading]);

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
  }, [domains, randomEmail, setCurrentEmails]);

  useEffect(() => {
    const current = currentEmails?.[currentChannel];
    if (
      !current &&
      ![EMAIL_CHANNEL_TYPE_ENUM.TEMP, EMAIL_CHANNEL_TYPE_ENUM.EDU].includes(
        currentChannel,
      )
    ) {
      genAddress(currentChannel);
    }
  }, [currentChannel, currentEmails, genAddress]);

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
        isImapEmail,
        nextRetryTime,
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
