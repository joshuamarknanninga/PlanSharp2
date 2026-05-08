import 'dotenv/config';
import { app } from './app';
import { connectDb } from './config/db';
import { env } from './config/env';

async function start() {
  await connectDb();
  app.listen(env.PORT, () => console.log(`PlanSharp API on ${env.PORT}`));
}
start();
