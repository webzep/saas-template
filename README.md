# SaaS Monorepo Template

> Disclaimer: Cursor generated this readme so it might be horribly fucking wrong

A modern SvelteKit monorepo template with integrated authentication, payment processing, and headless CMS capabilities.

The prod docker files are setup to be deployed on Coolify.

## What's Included

This monorepo contains:

### Apps

- **app** - A web application with authentication, user dashboard, and subscription management
- **web** - A marketing website with blog powered by Storyblok CMS

### Packages

- **config** - Shared configuration variables
- **firebase** - Firebase integration for storage and authentication
- **models** - Shared data models
- **pricing** - Pricing configuration for subscription plans
- **schemas** - Zod schemas for validation
- **ui** - Shared UI component library

## Tech Stack

- **SvelteKit 2** with TypeScript
- **Turborepo** for monorepo management
- **Authentication** via AuthJS with multiple providers
- **Firebase** for storage and backend functions
- **Stripe** for payment processing
- **Storyblok** for headless CMS content management
- **TRPC** for type-safe API endpoints
- **Biome** and **Prettier** for formatting
- **Docker** for local development

## Setup Instructions

### 1\. Install Dependencies

```bash
# Clone this repository
git clone <your-repo-url>
cd <repo-name>

# Install dependencies
yarn install
```

### 2\. Environment Variables

Create `.env` files based on the example files:

```bash
cp apps/app/.env.example apps/app/.env
cp apps/web/.env.example apps/web/.env
cp packages/firebase/.env.example packages/firebase/.env # If exists
```

### 3\. Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Storage and Authentication
3. Generate a service account key and add to your `.env` files:

  ```
  FIREBASE_CLIENT_EMAIL=your-service-account-email
  FIREBASE_PRIVATE_KEY=your-private-key
  FIREBASE_PROJECT_ID=your-project-id
  FIREBASE_STORAGE_BUCKET=your-storage-bucket
  ```

4. Set up CORS configuration for Firebase Storage:

  ```bash
  # Install gcloud CLI
  # https://cloud.google.com/sdk/docs/install

  gcloud auth login
  gcloud config set project YOUR_PROJECT_ID

  # Set CORS configuration
  gsutil cors set ./packages/firebase/src/lib/cors.json gs://YOUR_BUCKET_NAME
  ```

### 4\. Storyblok Setup

1. Create a Storyblok account and space at [storyblok.com](https://storyblok.com)
2. Install the Storyblok CLI:

  ```bash
  npm i storyblok -g
  ```

3. Log in to your Storyblok account:

  ```bash
  storyblok login
  ```

4. Add your Storyblok access token to `apps/web/.env`:

  ```
  STORYBLOK_ACCESS_TOKEN=your-access-token
  ```

5. Push and sync the components:

  ```bash
  # Update space ID in package.json commands first
  # Find your space ID in the Storyblok dashboard

  # Push components to Storyblok
  yarn web sb:push

  # Sync types
  yarn web sb:sync
  ```

### 5\. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Add your API keys to `apps/app/.env`:

  ```
  STRIPE_SECRET_KEY=your-stripe-secret-key
  STRIPE_WEBHOOK_SECRET=your-webhook-secret
  ```

3. For local development, install the Stripe CLI to forward webhook events:

  ```bash
  # Install Stripe CLI (https://stripe.com/docs/stripe-cli)

  # Forward events to your local server
  yarn app stripe:local
  ```

### 6\. Authentication Setup

1. Set up OAuth providers in your `.env` file as needed (GitHub, Google, etc.)
2. Generate an AUTH_SECRET:

  ```bash
  # On UNIX systems
  openssl rand -hex 32

  # Or use https://generate-secret.vercel.app/32
  ```

## Development

```bash
# Start all applications in development mode
yarn dev

# Start a specific application
yarn app dev
yarn web dev

# Build all applications
yarn build
```

## Docker Development

Each app has Docker setup for local development:

```bash
# For the app
yarn app dev:up         # Start containers
yarn app dev:down       # Stop containers
yarn app dev:build      # Build
yarn app dev:restart    # Rebuild and restart

# For the web
yarn web dev:up         # Start containers
yarn web dev:down       # Stop containers
yarn web dev:build      # Build
yarn web dev:restart    # Rebuild and restart
```

## Deployment

The apps are configured to be deployed to any hosting provider that supports SvelteKit, such as Vercel, Netlify, or Firebase Hosting.

For production deployments, make sure to:

1. Set all required environment variables
2. Set up proper webhook endpoints for Stripe
3. Configure proper CORS settings for Firebase Storage
