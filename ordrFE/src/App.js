import React, { useEffect, useState } from 'react';
import { Routes, MobileRoutes } from "./routes"
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserView, MobileView } from 'react-device-detect';
import { isAndroid } from 'mobile-device-detect';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const queryClient = new QueryClient()
  const [sessStorage, setSessStorage] = useState(false)

  if (sessionStorage.getItem("android_open_app") == null) {
    setSessStorage(true)
  }

  if (sessStorage) {
    sessionStorage.setItem("android_open_app", 1);
    setSessStorage(false)
  }

  React.useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    console.log('15092022172051')
    if (isAndroid && sessionStorage.getItem("android_open_app") == 1) {
      if (window.confirm('Would you like to access the app?')) {
        sessionStorage.setItem("android_open_app", 0);
        window.open('https://play.google.com/store/apps/details?id=com.stllr.chat', '_blank');
      } else {
        sessionStorage.setItem("android_open_app", 0);
      }
    }
  }, [isAndroid]);

  return (
    <div className={`container ${i18n.language}`}>
      <QueryClientProvider client={queryClient}>
              <Routes />
            {/* <BrowserView> */}
            {/* </BrowserView> */}
            {/* <MobileView>
          <MobileRoutes />
        </MobileView> */}
      </QueryClientProvider>
    </div>
  );
}

export default App;
