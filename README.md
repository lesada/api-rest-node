
### A mock API to handle restaurant orders data and transactions

## 🧪 Technologies

### Back-End
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Knex.js](https://knexjs.org/)
- [Supabase (PostgreSQL)](https://supabase.com/)
- [Vercel](https://vercel.com/)

## 🚀 Getting started

### Requisites

- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) or [Pnpm](https://pnpm.io/pt/)

### Clone the application

```bash
git clone https://github.com/lesada/api-rest-node.git
```

### Running the project

- Install all dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

- Create a `.env` file based on `.env.example` and configure your database connection:

```env
DATABASE_CLIENT=pg
DATABASE_URL=postgresql://username:password@host:port/database
PORT=3333
NODE_ENV="production"
```

- Create a `.env.dev` file based on `.env.example` and configure your dev database connection (mostly using sqlite):

```env.dev
DATABASE_CLIENT=sqlite
DATABASE_URL=folder/file
PORT=3333
NODE_ENV="development"
```

- Start the application:

```bash
npm run dev
# or
yarn dev
# or
pnpm run dev
```

The API will be running at `http://localhost:3333`.

### Deployment

This project is ready for deployment on [Vercel](https://vercel.com/), using the vercel.json file.  
Make sure to set your environment variables on the Vercel dashboard.

---

Made with 💜
