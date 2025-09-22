'use client';
import ChannelCard from '@/app/[locale]/(app)/inbox/components/channel-card';
import { AntdRadioGroup, AntdTitle } from '@/components/antd';
import SliderScroller from '@/components/slider-scroller';
import { useSubscription } from '@/providers/subscription';
import { Title } from '@/providers/title';
import {
  RiBookmarkLine,
  RiDiceLine,
  RiEditLine,
  RiFileCopyLine,
  RiQuestionnaireLine,
  RiRefreshLine,
} from '@remixicon/react';
import { Button, Card, List, Space } from 'antd';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.inbox');
  const g = useTranslations('global');
  const { is_free } = useSubscription();
  return (
    <>
      <Title title={t('title')} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <div>
          <AntdRadioGroup block className="block -my-2" defaultValue={'1'}>
            <SliderScroller
              navs={{
                size: 'small',
              }}
              classNames={{
                scroller: 'gap-4 lg:gap-6 py-2',
              }}
            >
              <ChannelCard
                value={'1'}
                label={g('emails.temp.name')}
                desc={g('emails.temp.desc')}
                icon={'/images/mail/at.png'}
              />
              <ChannelCard
                value={'0'}
                label={g('emails.edu.name')}
                desc={g('emails.edu.desc')}
                icon={'/images/mail/edu.png'}
              />
              <ChannelCard
                value={'2'}
                label={g('emails.gmail.name')}
                desc={g('emails.gmail.desc')}
                icon={'/images/mail/gmail.png'}
                available={!is_free}
              />
              <ChannelCard
                value={'3'}
                label={g('emails.outlook.name')}
                desc={g('emails.outlook.desc')}
                icon={'/images/mail/outlook.png'}
                available={!is_free}
              />
              <ChannelCard
                value={'4'}
                label={g('emails.icloud.name')}
                desc={g('emails.icloud.desc')}
                icon={'/images/mail/icloud.png'}
                stock={0}
                available={!is_free}
              />
              <ChannelCard
                value={'5'}
                label={g('emails.gmx.name')}
                desc={g('emails.gmx.desc')}
                icon={'/images/mail/gmx.png'}
                stock={0}
                available={!is_free}
              />
              <ChannelCard
                value={'8'}
                label={g('emails.yahoo.name')}
                desc={g('emails.yahoo.desc')}
                icon={'/images/mail/yahoo.png'}
                stock={0}
                available={!is_free}
              />
              <ChannelCard
                value={'9'}
                label={g('emails.mail.name')}
                desc={g('emails.mail.desc')}
                icon={'/images/mail/mail_com.png'}
                stock={0}
                available={!is_free}
              />
            </SliderScroller>
          </AntdRadioGroup>
        </div>
        <Card>
          <div className="">
            <div className="text-xs text-black/50 mb-2">
              {t('email.current')}
            </div>
            <div>
              <AntdTitle level={2} className="m-0">
                username@example.com
              </AntdTitle>
            </div>
            <div className="-ml-2 mt-4 flex justify-between items-center gap-2 flex-wrap">
              <Space>
                <Button
                  type="text"
                  className="leading-none"
                  icon={<RiFileCopyLine size={18} />}
                  size="small"
                >
                  {t('email.actions.copy')}
                </Button>
                <Button
                  type="text"
                  className="leading-none"
                  icon={<RiDiceLine size={18} />}
                  size="small"
                >
                  {t('email.actions.random')}
                </Button>
                <Button
                  type="text"
                  className="leading-none"
                  icon={<RiEditLine size={18} />}
                  size="small"
                >
                  {t('email.actions.custom')}
                </Button>
                <Button
                  type="text"
                  className="leading-none"
                  icon={<RiBookmarkLine size={18} />}
                  size="small"
                >
                  {t('email.actions.archive')}
                </Button>
              </Space>
              <Space>
                <Button
                  type="text"
                  className="leading-none"
                  icon={<RiQuestionnaireLine size={18} />}
                  size="small"
                >
                  {t('email.actions.help')}
                </Button>
              </Space>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 lg:mb-6">
            <div>
              <AntdTitle level={5} className="m-0">
                {t('messages.title')}
              </AntdTitle>
            </div>
            <div>
              <Space size="middle">
                <span className="text-black/50">
                  {t('messages.countdown', {
                    num: 10,
                  })}
                </span>
                <Button
                  className="leading-none"
                  icon={<RiRefreshLine size={16} />}
                >
                  {t('messages.actions.refresh')}
                </Button>
              </Space>
            </div>
          </div>
          <List />
        </Card>
        <div className="text-xs text-black/50 text-center py-1">
          {t('messages.tips')}
        </div>
      </div>
    </>
  );
}
