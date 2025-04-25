// hooks/userTypes.ts
import { User as PrismaUser, Account, Session } from '@prisma/client';
import { User as NextAuthUser } from 'next-auth';

export type ExtendedUser =
  | (PrismaUser & {
      accounts: Account[];
      sessions: Session[];
    })
  | NextAuthUser
  | null
  | undefined;
