import { Pool } from "pg";
// import {} from ""
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

//   onConnectionOpened: () => {
//     if (databaseConnectionLog)
//       logger.log(
//         `[DB_POOL_INFO] - ${new Date().toISOString()} - Opened connection. Active connections = ${++connectionsCount}`
//       );
//   },
//   onConnectionClosed: () => {
//     if (databaseConnectionLog)
//       logger.log(
//         `[DB_POOL_INFO] - ${new Date().toISOString()} - Closed connection. Active connections = ${--connectionsCount}`
//       );
//   },
});

type User = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
};

//   const createConnection = ({ dbUrl, poolSize = 1 }) => {
//     let connectionsCount = 0
//     const pool = createConnectionPool({
//       bigIntMode: 'number',
//       connectionString: dbUrl,
//       poolSize,
//       onConnectionOpened: () => {
//         if (databaseConnectionLog) logger.log(
//           `[DB_POOL_INFO] - ${new Date().toISOString()} - Opened connection. Active connections = ${++connectionsCount}`,
//         )
//       },
//       onConnectionClosed: () => {
//         if (databaseConnectionLog) logger.log(
//           `[DB_POOL_INFO] - ${new Date().toISOString()} - Closed connection. Active connections = ${--connectionsCount}`,
//         )
//       },
//     })

//     return pool
//   }

// pool.query<User>(`SELECT * FROM "User"`).then((result) => {
