const pool = require('../config/db.js')

const FindAllOrder = async (userId, role) => {

    let query
    let params = []

    // console.log(role)

    if (role === 'admin') {
        query = 'SELECT * FROM orders';
        params = []

    }
    else if (role === 'merchant') {
        query = 'SELECT* FROM orders WHERE merchant_id=$1';
        params = [userId];

    }

    else if (role === 'delivery_guy') {
        query = 'SELECT * FROM orders WHERE delivery_guy_id= $1'
        params = [userId]
    }

    else {
        throw new Error('Invalid Roless')
    }

    const [rows] = await pool.query(query, params)

    return rows;


}

module.exports= FindAllOrder