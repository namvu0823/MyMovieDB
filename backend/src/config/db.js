import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createConnection(process.env.MYSQL_URL);
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT||3306),
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,

    // waitForConnections:true,
    // connectionLimit:10,
    // queueLimit:0,
    // timezone:'Z',
    // supportBigNumbers:true,
    // dateStrings:true,
    // namedPlaceholders:true,});


(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ MySQL connected successfully!");
        connection.release();
    } catch (err) {
        console.error("❌ MySQL connection failed:", err.message);
    }
})();
