<h1 align=center>Americano - Authentication Server</h1>

## Getting Started

### Requiremets to run the application

- NPM v16 and above
- Yarn

### Setup

1.  Check if `node_modules` is already in the directory
2.  Copy ENV file using the following command

```bash
  cp .env.example .env
```

3. Populate variables inside `.env` file

### All you need to know

1. Starting server locally using `yarn dev`command

2. Migrations

   - Creating a migration

   ```bash
       yarn migration create ./src/migrations/migration-name
   ```

   - Running a migration update

   ```bash
       yarn migration:up
   ```

   - Running a migration revert

   ```bash
       yarn migration:down
   ```
