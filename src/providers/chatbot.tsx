import Script from 'next/script';
import React from 'react';

declare global {
  interface Window {
    $crisp: unknown[];
  }
}

const ChatbotProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      {children}
      <Script id="chatbot" strategy="lazyOnload">
        {` window.$crisp=[];window.CRISP_WEBSITE_ID="6af4a4cf-5c2e-4b46-9f8c-377103164632";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
      </Script>
    </>
  );
};

const useChatbot = () => {
  const openChatbot = () => {
    if (window !== undefined && window.$crisp) {
      // 显示聊天窗口
      window.$crisp.push(['do', 'chat:open']);
    }
  };

  return {
    openChatbot,
  };
};

export { ChatbotProvider, useChatbot };
