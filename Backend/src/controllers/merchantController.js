const createMerchant = require("../models/merchant");
const FindUserByEmail = require("../models/user");


const registerMerchant = async (req, res) => {

  const { business_name, business_type, business_category, business_address, business_description, opening_hours, closing_hours, owner_full_name, owner_phone, email, role_in_business, owner_national_id, password, confirm_password } = req.body;
  const requiredFields = {
    business_name,
    business_type,
    business_category,
    business_address,
    business_description,
    opening_hours,
    closing_hours,
    owner_full_name,
    owner_phone,
    email,
    role_in_business,
    owner_national_id,
    password,
    confirm_password,
  };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (value === undefined || value === null || value === '') {
      return res.status(400).json({ error: `${key} is required and cannot be empty.` });
    }
  }

  if (password !== confirm_password) {
    res.status(400).json({ error: 'Password is not matches' })
  }

  const existingUser = await FindUserByEmail(email, 'merchant');
  if (existingUser !== null) {
    return res.status(400).json({ error: 'the user is existing' })
  }
  // console.log(req.files.business_license_path?.[0]?.path)
  const businessLicensePath = req.files.business_license_path?.[0]?.path || null;
  //  const governmentIdPath = req.files.governmentId?.[0]?.path || null ;

  if (!businessLicensePath) {
    return res.status(400).json({ error: 'Missing required documents' });
  }
  try {

    await createMerchant(
      business_name,
      business_type,
      business_category,
      business_address,
      business_description,
      opening_hours,
      closing_hours,
      owner_full_name,
      owner_phone,
      email,
      role_in_business,
      owner_national_id,
      password,
      businessLicensePath,

    );

    res.status(201).json({ message: 'The merchant is successfully registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error registering the merchant ${err}` });
  }

}

module.exports = registerMerchant