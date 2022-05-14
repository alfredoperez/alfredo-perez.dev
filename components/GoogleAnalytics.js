import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const GAScript = () => {
  const envId = process.env.GOOGLE_ANALYTICS_ID
  const id = siteMetadata.analytics.googleAnalyticsId || 'UA-76775958-2'

  console.log({ envId, id })
  return (
    <>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />

      <Script strategy="lazyOnload" id="ga-script">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}', {
              page_path: window.location.pathname,
            });
        `}
      </Script>
    </>
  )
}

export default GAScript

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = (action, category, label, value) => {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
