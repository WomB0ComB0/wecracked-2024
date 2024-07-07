import secretKey from '@/env';
import { PrismaClient } from '@prisma/client';

declare global {
	// eslint-disable-next-line vars-on-top, no-var
	var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
	global.prisma ||
	new PrismaClient({
		log: secretKey.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
	});

if (secretKey.NODE_ENV !== 'production') global.prisma = prisma;
