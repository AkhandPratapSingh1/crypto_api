// test-db-connection.ts
import connectToDatabase from './utils/db';

(async () => {
  try {
    const db = await connectToDatabase();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();
