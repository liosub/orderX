import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
// import './index.css';
import './output.css';
import './index.scss';
import App from './App';
import { AuthProvider } from "./utils/Auth"
// import { CometChat } from "@cometchat-pro/chat";


Sentry.init({
  dsn: "https://b7eaa0642ba449a6aedc0b5d79b5b5cd@o1043073.ingest.sentry.io/6012418",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


// const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(process.env.REACT_APP_COMETCHAT_APP_REGION).build();
// CometChat.init(process.env.REACT_APP_COMETCHAT_APP_ID, appSetting).then(
//   () => {
    ReactDOM.render(
      <AuthProvider>
        <App/>
      </AuthProvider>,
      document.getElementById('root')
    );
//   },
//   error => {
//     console.log("Initialization failed with error:", error);
//     // Check the reason for error and take appropriate action.
//   }
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
