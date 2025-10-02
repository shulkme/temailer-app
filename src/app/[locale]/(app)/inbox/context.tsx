'use client';
import { getAllDomains } from '@/apis/domain';
import { DomainRecord } from '@/apis/domain/types';
import { getEmailAddress } from '@/apis/email';
import { EMAIL_CHANNEL_TYPE_ENUM } from '@/apis/email/enums';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocalStorageState, useRequest, useSetState } from 'ahooks';
import { SetState } from 'ahooks/es/useSetState';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
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
  autoRefresh: boolean;
  setAutoRefresh: (autoRefresh: boolean) => void;
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

  const searchParams = useSearchParams();

  const initEmail = searchParams.get('email');

  const pathname = usePathname();

  const router = useRouter();

  const [nextRetryTime, setNextRetryTime] = useState<string>();

  const [autoRefresh, setAutoRefresh] = useLocalStorageState('AUTO_REFRESH', {
    defaultValue: true,
    listenStorageChange: true,
  });

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
    const current = currentEmails?.[currentChannel];
    if (!current) {
      if (
        [EMAIL_CHANNEL_TYPE_ENUM.TEMP, EMAIL_CHANNEL_TYPE_ENUM.EDU].includes(
          currentChannel,
        )
      ) {
        setCurrentEmails({
          [currentChannel]: randomEmail(currentChannel),
        });
      } else {
        genAddress(currentChannel);
      }
    }
  }, [
    currentChannel,
    currentEmails,
    genAddress,
    randomEmail,
    setCurrentEmails,
  ]);

  useEffect(() => {
    if (initEmail) {
      const match = initEmail.match(/@([a-zA-Z0-9.-]+)\./);
      if (match) {
        const domain = match[1];
        if (domain.endsWith('edu')) {
          setCurrentChannel(EMAIL_CHANNEL_TYPE_ENUM.EDU);
          setCurrentEmails({
            [EMAIL_CHANNEL_TYPE_ENUM.EDU]: initEmail,
          });
          return;
        }

        switch (domain) {
          case 'gmail':
            setCurrentChannel(EMAIL_CHANNEL_TYPE_ENUM.GMAIL);
            setCurrentEmails({
              [EMAIL_CHANNEL_TYPE_ENUM.GMAIL]: initEmail,
            });
            break;
          case 'outlook':
          case 'live':
            setCurrentChannel(EMAIL_CHANNEL_TYPE_ENUM.OUTLOOK);
            setCurrentEmails({
              [EMAIL_CHANNEL_TYPE_ENUM.OUTLOOK]: initEmail,
            });
            break;
          case 'yahoo':
            setCurrentChannel(EMAIL_CHANNEL_TYPE_ENUM.YAHOO);
            setCurrentEmails({
              [EMAIL_CHANNEL_TYPE_ENUM.YAHOO]: initEmail,
            });
            break;
          case 'mail':
            setCurrentChannel(EMAIL_CHANNEL_TYPE_ENUM.MAIL);
            setCurrentEmails({
              [EMAIL_CHANNEL_TYPE_ENUM.MAIL]: initEmail,
            });
            break;
          case 'gmx':
            setCurrentChannel(EMAIL_CHANNEL_TYPE_ENUM.GMX);
            setCurrentEmails({
              [EMAIL_CHANNEL_TYPE_ENUM.GMX]: initEmail,
            });
            break;
          case 'icloud':
            setCurrentChannel(EMAIL_CHANNEL_TYPE_ENUM.ICLOUD);
            setCurrentEmails({
              [EMAIL_CHANNEL_TYPE_ENUM.ICLOUD]: initEmail,
            });
            break;
          default:
            setCurrentChannel(EMAIL_CHANNEL_TYPE_ENUM.TEMP);
            setCurrentEmails({
              [EMAIL_CHANNEL_TYPE_ENUM.TEMP]: initEmail,
            });
        }
      }
    }
  }, [initEmail, setCurrentEmails]);

  useEffect(() => {
    if (currentEmail) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('email', currentEmail);
      router.replace(pathname + '?' + params.toString());
    }
  }, [currentEmail, pathname, router, searchParams]);

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
        autoRefresh,
        setAutoRefresh,
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
