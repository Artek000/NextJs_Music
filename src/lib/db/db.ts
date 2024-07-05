import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000
})

export default pool
