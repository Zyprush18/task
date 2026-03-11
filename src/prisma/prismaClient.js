import 'dotenv/config';
import { PrismaClient } from './../../generated/prisma/client';
import { PrismaPostgresAdapter } from '@prisma/adapter-ppg';

const connection = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPostgresAdapter(connection);

const prisma = new PrismaClient({ adapter });

export default prisma;