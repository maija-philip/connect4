/*
    Maija Philip
    Connect 4
*/
const mysql = require("mysql2/promise");
const {Connector} = require('@google-cloud/cloud-sql-connector');

module.exports = function () {
    
    this.runSQL = async ( sql, data ) => {
        const connector = new Connector();
        const clientOpts = await connector.getOptions({
          instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
          ipType: "PUBLIC"
        });
      
        const pool = await mysql.createPool({
          ...clientOpts,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });
      
        const conn = await pool.getConnection();
      
        // const [result] = await conn.query(`SELECT * FROM connect_4_user `);
        const [result] = await conn.query(sql, data);
        console.table(result); // prints returned time value from server   
        return result;
    }

} // module.exports