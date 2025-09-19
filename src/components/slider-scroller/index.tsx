'use client';
import { cn } from '@/utils/classname';
import {
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowUpSLine,
} from '@remixicon/react';
import { Button, ButtonProps } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const SliderScroller: React.FC<{
  children: React.ReactNode;
  classNames?: {
    root?: string;
    scroller?: string;
    navs?: string;
  };
  vertical?: boolean;
  navs?: {
    size?: ButtonProps['size'];
  };
}> = ({ children, classNames, vertical, navs }) => {
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(true);
  const [step, setStep] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const watch = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
      scrollTop,
      scrollHeight,
      clientHeight,
    } = scroller;

    const start = vertical ? scrollTop : scrollLeft;
    const end = vertical
      ? Math.ceil(scrollTop + clientHeight)
      : Math.ceil(scrollLeft + clientWidth);
    const len = vertical ? clientHeight : clientWidth;
    const scrollLen = vertical ? scrollHeight : scrollWidth;
    setIsStart(start === 0);
    setIsEnd(end >= scrollLen);
    setStep(len);
  };

  const prev = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy(
      vertical
        ? {
            top: -step,
            behavior: 'smooth',
          }
        : {
            left: -step,
            behavior: 'smooth',
          },
    );
  };

  const next = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy(
      vertical
        ? {
            top: step,
            behavior: 'smooth',
          }
        : {
            left: step,
            behavior: 'smooth',
          },
    );
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.addEventListener('scroll', watch);

    return () => scroller.removeEventListener('scroll', watch);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const observer = new MutationObserver(watch);
    if (scroller) {
      observer.observe(scroller, {
        childList: true,
        subtree: true,
      });
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    watch();
  }, []);

  return (
    <div className={cn('relative', classNames?.root)}>
      <div className="w-full h-full overflow-hidden">
        <div
          ref={scrollerRef}
          className={cn(
            'w-full h-full flex',
            vertical
              ? 'flex-col snap-y overflow-y-auto'
              : 'snap-x overflow-x-auto',
            classNames?.scroller,
          )}
          style={{
            scrollbarWidth: 'none',
          }}
        >
          {children}
        </div>
      </div>
      {!isStart && (
        <div
          className={cn(
            'absolute z-[1000]',
            vertical
              ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
              : 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
            classNames?.navs,
          )}
        >
          <Button
            size={navs?.size}
            shape="circle"
            className="leading-none border-0 shadow-lg"
            icon={
              vertical ? (
                <RiArrowUpSLine size={18} />
              ) : (
                <RiArrowLeftSLine size={18} />
              )
            }
            onClick={prev}
          />
        </div>
      )}
      {!isEnd && (
        <div
          className={cn(
            'absolute z-[1000]',
            vertical
              ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
              : 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
            classNames?.navs,
          )}
        >
          <Button
            size={navs?.size}
            shape="circle"
            className="leading-none border-0 shadow-lg"
            icon={
              vertical ? (
                <RiArrowDownSLine size={18} />
              ) : (
                <RiArrowRightSLine size={18} />
              )
            }
            onClick={next}
          />
        </div>
      )}
    </div>
  );
};

export default SliderScroller;
