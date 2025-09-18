import { AntdTitle } from '@/components/antd';
import PrimaryButton from '@/components/primary-button';
import { Title } from '@/providers/title';
import { RiCheckLine } from '@remixicon/react';
import { Button, Card, ConfigProvider, Progress, Segmented } from 'antd';

export default function Page() {
  return (
    <>
      <Title title={'订阅'} />
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          <div className="col-span-2 lg:col-span-1">
            <Card>
              <div className="space-y-4">
                <div className="text-black/50">当前套餐</div>
                <h2 className="text-3xl font-bold">高级版</h2>
                <div>套餐到期时间：2025-10-01</div>
                <div>
                  <Button
                    className="px-4"
                    size="small"
                    color="primary"
                    variant="outlined"
                  >
                    升级套餐
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Card>
              <div className="space-y-4">
                <div className="text-black/50">剩余积分</div>
                <h2 className="text-3xl font-bold">1,234</h2>
                <div>
                  <Progress
                    percent={50}
                    strokeLinecap="butt"
                    showInfo={false}
                  />
                </div>
                <div>
                  <Button
                    className="px-4"
                    size="small"
                    color="primary"
                    variant="outlined"
                  >
                    充值积分
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-2">
            <Card>
              <AntdTitle level={5} className="mb-6">
                订阅
              </AntdTitle>
              <div className="mb-6">
                <ConfigProvider
                  theme={{
                    components: {
                      Segmented: {
                        controlPaddingHorizontal: 32,
                        trackPadding: 4,
                        // trackBg: 'var(--color-primary-100)',
                      },
                    },
                  }}
                >
                  <Segmented
                    defaultValue="yearly"
                    size="large"
                    options={[
                      {
                        label: <>月付</>,
                        value: 'monthly',
                      },
                      {
                        label: (
                          <>
                            年付{' '}
                            <span className="text-primary-500 font-medium">
                              (16% OFF)
                            </span>
                          </>
                        ),
                        value: 'yearly',
                      },
                    ]}
                  />
                </ConfigProvider>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
                <div className="col-span-1">
                  <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-lg">免费版</div>
                    </div>
                    <div>
                      <span className="font-bold text-3xl">$0</span>
                      <span className="text-black/50">/mo</span>
                    </div>
                    <div className="text-sm text-black/50">
                      适合个人用户注册使用
                    </div>
                    <div>
                      <Button block color="primary" variant="outlined">
                        当前版本
                      </Button>
                    </div>
                    <div className="border-t border-slate-100 my-6"></div>
                    <div>
                      <ul className="space-y-4">
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            每月积分<strong>100</strong>个
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>支持临时/教育邮箱收信</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            发信邮件数量上限<strong>100</strong>封
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>客户支持</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-lg">入门版</div>
                      <div className="font-medium text-xs px-2 py-1 bg-primary-50 text-primary-500 rounded-r-full rounded-tl-full">
                        16% OFF
                      </div>
                    </div>
                    <div className="space-x-1">
                      <span className="font-bold text-3xl">$8.2</span>
                      <span className="text-black/50">/mo</span>
                      <span className="text-black/30 line-through font-medium">
                        $9.9
                      </span>
                    </div>
                    <div className="text-sm text-black/50">
                      适合个人/开发者批量注册使用
                    </div>
                    <div>
                      <PrimaryButton block>立即升级</PrimaryButton>
                    </div>
                    <div className="border-t border-slate-100 my-6"></div>
                    <div>
                      <ul className="space-y-4">
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            每月 <strong>12,000</strong> 个积分
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            每封邮件单价 <strong>$0.0007</strong>
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            支持临时/教育/
                            <strong className="text-primary-500">主流</strong>
                            邮箱收信
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>支持通过API接口收发信</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>发信邮件数量不上限</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>支持自定义收发邮箱域名</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>7x24客户支持</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="relative w-full min-h-full border-[2px] border-primary-500 p-4 lg:p-6 space-y-4">
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute w-[200%] py-1 top-1/3 -left-1/3 -translate-y-1/2 rotate-45 bg-primary-500 text-xs text-white text-center">
                        最受欢迎
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-lg">高级版</div>
                      <div className="font-medium text-xs px-2 py-1 bg-primary-50 text-primary-500 rounded-r-full rounded-tl-full">
                        16% OFF
                      </div>
                    </div>
                    <div className="space-x-1">
                      <span className="font-bold text-3xl">$24.1</span>
                      <span className="text-black/50">/mo</span>
                      <span className="text-black/30 line-through font-medium">
                        $29.9
                      </span>
                    </div>
                    <div className="text-sm text-black/50">
                      适合工作室/企业批量注册使用
                    </div>
                    <div>
                      <PrimaryButton block>立即升级</PrimaryButton>
                    </div>
                    <div className="border-t border-slate-100 my-6"></div>
                    <div>
                      <ul className="space-y-4">
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            每月 <strong>120,000</strong> 个积分
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            每封邮件单价 <strong>$0.0002</strong>
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            支持临时/教育/
                            <strong className="text-primary-500">主流</strong>
                            邮箱收信
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>支持通过API接口收发信</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>发信邮件数量不上限</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>支持自定义收发邮箱域名</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>7x24客户支持</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-lg">旗舰版</div>
                      <div className="font-medium text-xs px-2 py-1 bg-primary-50 text-primary-500 rounded-r-full rounded-tl-full">
                        16% OFF
                      </div>
                    </div>
                    <div className="space-x-1">
                      <span className="font-bold text-3xl">$65.8</span>
                      <span className="text-black/50">/mo</span>
                      <span className="text-black/30 line-through font-medium">
                        $79.9
                      </span>
                    </div>
                    <div className="text-sm text-black/50">
                      适合企业/卡商批量注册使用
                    </div>
                    <div>
                      <PrimaryButton block>立即升级</PrimaryButton>
                    </div>
                    <div className="border-t border-slate-100 my-6"></div>
                    <div>
                      <ul className="space-y-4">
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            每月 <strong>1,200,000</strong> 个积分
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            每封邮件单价 <strong>$0.00006</strong>
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            支持临时/教育/
                            <strong className="text-primary-500">主流</strong>
                            邮箱收信
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>支持通过API接口收发信</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>发信邮件数量不上限</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>支持自定义收发邮箱域名</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>
                            赠送 <strong className="text-primary-500">1</strong>{' '}
                            个域名
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="text-primary-500">
                            <RiCheckLine size={16} />
                          </span>
                          <span>7x24客户支持</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                没有找到合适的套餐？<a href="">联系我们</a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
