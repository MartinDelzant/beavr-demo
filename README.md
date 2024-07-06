## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

## Deploying your own DB

Create a postgres SQL instance on Vercel and run the SQL script inside `createDB.sql`

## Connecting your local project

```bash
vercel env pull .env.development.local
```
