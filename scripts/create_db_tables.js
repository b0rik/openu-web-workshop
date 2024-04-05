const { db } = require('@vercel/postgres');

const createUserTable = async (client) => {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS "user" (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        hashed_password CHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        degree VARCHAR(255)
      );
    `;

    console.log('User table created');
  } catch (error) {
    console.error('Error creating user table:', error);
    throw error;
  }
};

const main = async () => {
  const client = await db.connect();
  await createUserTable(client);
  await client.end();
};

main().catch((err) => {
  console.error('An error occured while creating the database:', err);
});
