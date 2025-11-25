# Environment configuration

Create a `.env` file in the repository root to configure runtime values:

```
APP_PORT=3000
CLIENT_ORIGIN=http://localhost:4200
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mechanic?schema=public
STRIPE_SECRET_KEY=sk_test_replace_me
STRIPE_WEBHOOK_SECRET=whsec_replace_me
```

- `APP_PORT`: Port exposed by the NestJS API.
- `CLIENT_ORIGIN`: Comma-separated list of origins allowed by CORS.
- `DATABASE_URL`: Connection string consumed by Prisma.
- `STRIPE_SECRET_KEY`: Stripe secret key (test or live).
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret from the Stripe CLI or dashboard.

> Keep production secrets outside of source control—use a secret manager or environment variables provided by your hosting platform.

