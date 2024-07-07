// Here you probably want to add abstractions of libraries or utilities

// for example if you were using Sanity as your CMS you might want to add:
// sanity.ts -> methods to interact with Sanity CMS
import { getDateCompare } from './date';
import { prisma } from './db';
import { fetcher } from './fetcher';
import { logError, logInfo } from './logger';
import { cn } from './utils';

export { cn, fetcher, getDateCompare, logError, logInfo, prisma };
