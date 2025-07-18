import * as Sentry from "@sentry/react-router";
// Remove or comment out the following line
// import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://16070550b05e93158a474d4324d02b7a@o4509469024518144.ingest.us.sentry.io/4509469034151936",
  sendDefaultPii: true,
  _experiments: { enableLogs: true },
  integrations: [
    // Remove nodeProfilingIntegration()
    // nodeProfilingIntegration()
  ],
  tracesSampleRate: 1.0,
  // Remove profilesSampleRate since it's tied to profiling
  // profilesSampleRate: 1.0,
});