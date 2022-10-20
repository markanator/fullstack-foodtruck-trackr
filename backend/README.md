# Food Truck Trackr - Backend

1. Create Google Developer Account, enable Google Maps API, and save the API Key for it.
2. Create a PostgreSQL database a save the database URL
3. Enter the appropriate env variables needed
   ```sh
   DATABASE_URL="postgresql://............"
   DB_ENV="development"
   SECRET_JWT="abc123..."
   CORS_URL="http://localhost:3000"
   ```
4. Install Postgis on your Postgres DB
   ```sql
   	CREATE EXTENSION postgis;
   ```
5. Run migrations, (repeat until complete)
   ```sh
   	npx knex migrate:up
   ```
6. Seed DB
   ```sh
   	npx knex seed:run
   ```
7. Start Server in DEV mode
   ```sh
   	npm run dev
   ```
