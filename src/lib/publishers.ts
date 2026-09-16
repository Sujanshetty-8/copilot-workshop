/**
 * Publisher lookups for the static site.
 *
 * These queries read the SQLite database during build time and expose the
 * publisher catalog used by the game pages.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Retrieves every publisher in alphabetical order.
 *
 * @param db - Database instance used to query the publisher table.
 * @returns A promise that resolves to the publisher list sorted by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({ id: row.id, name: row.name }));
}
