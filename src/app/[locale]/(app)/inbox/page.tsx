import ChannelCard from '@/app/[locale]/(app)/inbox/components/channel-card';
import { AntdRadioGroup, AntdTitle } from '@/components/antd';
import SliderScroller from '@/components/slider-scroller';
import { Title } from '@/providers/title';
import {
  RiBookmarkLine,
  RiDiceLine,
  RiEditLine,
  RiFileCopyLine,
  RiRefreshLine,
} from '@remixicon/react';
import { Button, Card, List, Space } from 'antd';

export default function Page() {
  return (
    <>
      <Title title={'收信'} />
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
                label={'临时'}
                desc={'安全匿名，保护隐私，强烈推荐'}
                icon={'/images/mail/at.png'}
              />
              <ChannelCard
                value={'0'}
                label={'EDU'}
                desc={'教育邮箱，教育优惠服务推荐'}
                icon={'/images/mail/edu.png'}
              />
              <ChannelCard
                value={'2'}
                label={'Gmail'}
                desc={'谷歌邮箱服务，全球最受欢迎邮箱'}
                icon={'/images/mail/gmail.png'}
              />
              <ChannelCard
                value={'3'}
                label={'Outlook'}
                desc={'微软邮箱服务，安全可靠'}
                icon={'/images/mail/outlook.png'}
              />
              <ChannelCard
                value={'4'}
                label={'iCloud'}
                desc={'苹果邮箱服务，安全可靠'}
                icon={'/images/mail/icloud.png'}
                disabled
              />
              <ChannelCard
                value={'5'}
                label={'GMX'}
                desc={'欧洲热门邮箱服务商'}
                icon={'/images/mail/gmx.png'}
                disabled
              />
              <ChannelCard
                value={'8'}
                label={'Yahoo'}
                desc={'雅虎邮箱，美国、日本地区应用广泛'}
                icon={'/images/mail/yahoo.png'}
                disabled
              />
              <ChannelCard
                value={'9'}
                label={'Mail.com'}
                desc={'欧洲热门邮箱服务商'}
                icon={'/images/mail/mail_com.png'}
                disabled
              />
            </SliderScroller>
          </AntdRadioGroup>
        </div>
        <Card>
          <div className="">
            <div className="text-xs text-black/50 mb-2">当前邮箱</div>
            <div>
              <AntdTitle level={2} className="m-0">
                username@example.com
              </AntdTitle>
            </div>
            <div className="-ml-2 mt-4">
              <Space>
                <Button
                  type="text"
                  className="leading-none"
                  icon={<RiFileCopyLine size={18} />}
                  size="small"
                >
                  复制
                </Button>
                <Button
                  type="text"
                  className="leading-none"
                  icon={<RiDiceLine size={18} />}
                  size="small"
                >
                  随机
                </Button>
                <Button
                  type="text"
                  className="leading-none"
                  icon={<RiEditLine size={18} />}
                  size="small"
                >
                  自定义
                </Button>
                <Button
                  type="text"
                  className="leading-none"
                  icon={<RiBookmarkLine size={18} />}
                  size="small"
                >
                  收藏
                </Button>
              </Space>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 lg:mb-6">
            <div>
              <AntdTitle level={5} className="m-0">
                最新邮件
              </AntdTitle>
            </div>
            <div>
              <Space size="middle">
                <span className="text-black/50">10秒后自动刷新</span>
                <Button
                  className="leading-none"
                  icon={<RiRefreshLine size={16} />}
                >
                  刷新
                </Button>
              </Space>
            </div>
          </div>
          <List />
        </Card>
        <div className="text-xs text-black/50 text-center py-1">
          仅显示最近2个小时的邮件，过期自动删除。
        </div>
      </div>
    </>
  );
}
