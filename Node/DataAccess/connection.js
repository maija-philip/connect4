/*
    Maija Philip
    Connect 4
*/

const mysql = require('mysql');

module.exports = function () {
    
    this.connection = mysql.createConnection({
        host: "localhost",
        user: "mep4741",
        password: "l0l1tsmyDatabase!"
    });

    this.runSQL = ( sql, data ) => {
        return this.connection.connect( function (error) {
            if (error) throw error;
            console.log("Connected to DB!");

            this.connection.query(sql, data, (error, results) => {
                if (error) {
                    return {"error": error}
                }
                return results;
            })
        });
    }

} // module.exports