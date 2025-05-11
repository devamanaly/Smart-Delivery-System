const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT

})

pool.connect()
    .then(()=>console.log("the database  connection is successfull"))
    .catch((err)=>console.log("the database is connection is failed",err))

module.exports=pool;
// export default pool

// if (require.main === module) {
//     pool.query('SELECT * FROM merchant;', (err, res) => {
//       if (err) {
//         console.error('Database connection error:', err);
//       } else {
//         console.log('Merchant table data:', res.rows);
//       }
//       pool.end(); // close the connection after query
//     });
//   }