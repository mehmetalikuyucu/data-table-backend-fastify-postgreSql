import pgPromise from 'pg-promise'
//database connection
const connection = {
  database: null
}
export const connectPostgres = () => {
  if (!connection?.database) {
      const pgp = pgPromise({})
      
    connection.database = pgp(
      'postgres://user:password@localhost:5432/postgres'
    )
    }
  return connection.database
}
