import Script from 'next/script';
import React from 'react';

declare global {
  interface Window {
    Tawk_API: {
      maximize: () => void;
    };
  }
}

const ChatbotProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      {children}
      <Script id="chatbot" strategy="lazyOnload">
        {` var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/61b8601280b2296cfdd19bfa/1fms3eiq3';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);

window.Tawk_API = window.Tawk_API || {};
})();
          `}
      </Script>
    </>
  );
};

const useChatbot = () => {
  const openChatbot = () => {
    if (window !== undefined && window.Tawk_API) {
      window.Tawk_API.maximize();
    }
  };

  return {
    openChatbot,
  };
};

export { ChatbotProvider, useChatbot };
