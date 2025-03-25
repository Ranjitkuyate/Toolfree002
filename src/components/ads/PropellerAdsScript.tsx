import { useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';

const PropellerAdsScript = () => {
  useEffect(() => {
    // Register service worker for Propeller Ads
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log('Propeller Ads Service Worker registration successful with scope: ', registration.scope);
          },
          function(err) {
            console.log('Propeller Ads Service Worker registration failed: ', err);
          }
        );
      });
    }
  }, []);

  return (
    <>
      <Head>
        {/* Meta tags for Propeller Ads verification */}
        <meta name="propeller" content="12345abcdef67890" /> {/* Replace with your actual verification code */}
      </Head>
      
      {/* Propeller Ads Main Script */}
      <Script
        id="propeller-ads-main"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(s,u,z,p){
              s.src=u;s.setAttribute('data-zone',z);p.appendChild(s);
            })(
              document.createElement('script'),
              'https://iclickcdn.com/tag.min.js',
              '12345', // Replace with your actual zone ID
              document.body || document.documentElement
            )
          `
        }}
      />
      
      {/* Propeller Ads Push Notification Script */}
      <Script
        id="propeller-ads-push"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(p,u,s,h){
              p._pcq=p._pcq||[];
              p._pcq.push(['_currentTime',Date.now()]);
              s=u.createElement('script');
              s.type='text/javascript';
              s.async=true;
              s.src='https://cdn.pushcrew.com/js/12345.js'; // Replace with your actual push ID
              h=u.getElementsByTagName('script')[0];
              h.parentNode.insertBefore(s,h);
            })(window,document);
          `
        }}
      />
      
      {/* Propeller Ads Interstitial Ad Script */}
      <Script
        id="propeller-ads-interstitial"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var propellerIntOptions = {
              onPageLoad: true,
              scrollDelay: 60,
              exitIntent: true,
              frequency: 3,
              delayBeforeShow: 5,
              cookieExpires: 24
            };
            (function(s,u,z,p){
              s.src=u;s.setAttribute('data-zone',z);p.appendChild(s);
            })(
              document.createElement('script'),
              'https://iclickcdn.com/int.min.js',
              '67890', // Replace with your actual interstitial zone ID
              document.body || document.documentElement
            )
          `
        }}
      />
      
      {/* Propeller Ads Direct Link Script */}
      <Script
        id="propeller-ads-direct-link"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(s,u,z,p){
              s.src=u;s.setAttribute('data-zone',z);p.appendChild(s);
            })(
              document.createElement('script'),
              'https://iclickcdn.com/direct.min.js',
              '54321', // Replace with your actual direct link zone ID
              document.body || document.documentElement
            )
          `
        }}
      />
    </>
  );
};

export default PropellerAdsScript;
