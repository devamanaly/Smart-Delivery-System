const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const FindUserByEmail = require('../models/user');
const { error, loggers } = require('winston');
const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ error: "Email, password, and role are required" })
  }
  const validRoles = ['admin', 'merchant', 'delivery_guy']
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: "Please enter a valid Role" })
  }
  try {
    const user = await FindUserByEmail(email, role)
    //  console.log(` user parrword  ${user.password} password${password}`)
    //    const isMatch = await compare(password,user.password)
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid Password" })
    }
    const idField = `${role}_id`;
    const token = jsonwebtoken.sign(
      { id: user[idField], role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(500).json({
      token,
      role,
      id: user[`${role}_id`]
    })
  }
  catch (err) {
    // loggers.error(err.message)
    return res.status(500).json({ error: `Invalid response ${err}` })
  }
}
module.exports = login
