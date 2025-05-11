
const pool= require('../config/db.js')
// import pool from '../config/db.js'

const FindUserByEmail = async (email, role) => {
           
    let table;
       
    if (role === 'admin') {
        table = 'admin'
    }
    else if (role === 'merchant') {
        table = 'merchant'
    }
  
    else if (role === 'delivery_guy') {
        table = 'delivery_guy'
    }
      
    else {
        throw new error("Invalid ROle")
    }
    
    const query = `SELECT * FROM ${table} WHERE email = $1`;
    const values = [email];
    const result = await pool.query(query, values)
  
    return result.rows[0] || null;

}

module.exports= FindUserByEmail;
// export default FindUserByEmail