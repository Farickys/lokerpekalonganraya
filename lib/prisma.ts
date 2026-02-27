import mysql from 'mysql2/promise'

declare global {
  var db: mysql.Pool | undefined
}

export const db: mysql.Pool = globalThis.db ?? mysql.createPool(
  process.env.DATABASE_URL
    ? { uri: process.env.DATABASE_URL, waitForConnections: true, connectionLimit: 10 }
    : { host: '127.0.0.1', port: 3306, user: 'root', database: 'loker', waitForConnections: true, connectionLimit: 1 }
)

if (process.env.NODE_ENV !== 'production') globalThis.db = db

// Helper for type-safe queries
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const [rows] = await db.execute(sql, params)
  return rows as T[]
}

export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(sql, params)
  return rows[0] ?? null
}

// Export as prisma-compatible alias for easier migration later
export const prisma = { db, query, queryOne }
export default db
