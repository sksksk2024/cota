// types/user.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get model types via PrismaClient
type User = PrismaClient['user']['_runtime']['types']['Model']['Type'];
type Account = PrismaClient['account']['_runtime']['types']['Model']['Type'];
type Session = PrismaClient['session']['_runtime']['types']['Model']['Type'];

export type UserWithRelations = User & {
  accounts: Account[];
  sessions: Session[];
};
