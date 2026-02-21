"use client";
import Script from "next/script";

export default function Analytics() {
  // Your real Measurement ID
  const GA_MEASUREMENT_ID = 'G-TXYXDQKVN4';

  return (
    <>
      {/* Load Google Analytics only after page interaction to reduce initial load time */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}