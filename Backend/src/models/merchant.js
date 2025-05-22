const pool = require('../config/db')
const bcrypt = require('bcrypt')

const createMerchant = async (business_name, business_type, business_category, business_address, business_description, opening_hours, closing_hours, owner_full_name, owner_phone, email, role_in_business, owner_national_id, password, business_license_path) => {

    try {

        const hashPassword = await bcrypt.hash(password, 10);

        const query = ` INSERT INTO merchant(business_name, business_type, business_category,business_address, business_description, opening_hours, closing_hours,  owner_full_name, owner_phone, email, role_in_business, owner_national_id,  password, business_license_path) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
      $12, $13, $14)
      RETURNING * ;
      `
        const values = [
            business_name, business_type, business_category, business_address, business_description, opening_hours, closing_hours, owner_full_name, owner_phone, email, role_in_business, owner_national_id, hashPassword, business_license_path
        ]

        const result = await pool.query(query, values)

        return result.rows[0];

    }
    catch (err) {
        throw new Error(`the error is in merchant creation ${err} `)

    }


}

module.exports = createMerchant