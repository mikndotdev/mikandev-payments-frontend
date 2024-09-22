/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
      return {
          name: "mikandev-payments",
          removal: input?.stage === "master" ? "retain" : "remove",
          home: "aws",
          providers: { cloudflare: true },
      };
  },
  async run() {
      const LOGTO_CLIENT_SECRET = new sst.Secret("LOGTO_CLIENT_SECRET");
      const LOGTO_CLIENT_ID = new sst.Secret("LOGTO_CLIENT_ID");
      const LOGTO_M2M_SECRET = new sst.Secret("LOGTO_M2M_SECRET");
      const LOGTO_M2M_ID = new sst.Secret("LOGTO_M2M_ID");
      const NEXTAUTH_SECRET = new sst.Secret("NEXTAUTH_SECRET");
      const NEXTAUTH_URL = new sst.Secret("NEXTAUTH_URL");
      const HOST = new sst.Secret("HOST");
      const STRIPE_SECRET_KEY = new sst.Secret("STRIPE_SECRET_KEY");
      const STRIPE_PUBLIC_KEY = new sst.Secret("STRIPE_PUBLIC_KEY");
      const LMSQUEEZY_API_KEY = new sst.Secret("LMSQUEEZY_API_KEY");
      new sst.aws.Nextjs("mikandev-payments", {
          link: [
              LOGTO_CLIENT_SECRET,
              LOGTO_CLIENT_ID,
              LOGTO_M2M_SECRET,
              LOGTO_M2M_ID,
              NEXTAUTH_SECRET,
              NEXTAUTH_URL,
              HOST,
              STRIPE_SECRET_KEY,
              STRIPE_PUBLIC_KEY,
              LMSQUEEZY_API_KEY,
          ],
          domain: {
              name: "payments.mikandev.com",
              dns: sst.cloudflare.dns(),
          },
          environment: {
              NEXTAUTH_URL: NEXTAUTH_URL.value,
          },
      });
  },
});
