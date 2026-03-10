import 'dotenv/config';
// import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPostgresAdapter } from '@prisma/adapter-ppg';

const connection = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPostgresAdapter(connection);

const prisma = new PrismaClient({ adapter });

export default prisma;