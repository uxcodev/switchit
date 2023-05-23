const Company = require("../models/company");
const User = require("../models/user");

exports.getCompanies = async (req, res, next) => {
  let companies = await Company.find().populate("roles.user")
  res.status(200).json(companies)
}

// exports.getCompanyByEmail = async (req, res, next) => {
//   let company = await Company.findOne({ email: req.query.email })
//   res.status(200).json(company)
// }

exports.getCompanyById = async (req, res, next) => {
  let company = await Company.findOne({ _id: req.query.id })
  res.status(200).json(company)
}

exports.createCompany = (req, res, next) => {
  try {
    let companyFields = req.body.fields.company;
    let profileObj = {}
    console.log(companyFields)
    for (const [key, value] of Object.entries(companyFields)) {
      console.log(`${key}: ${value}`)
      profileObj[key] = value
    }
    let company = new Company(profileObj)
    company.save()
    res.status(200).json(company)
  } catch (error) {
    console.log(error)
  }

};

exports.signupCompany = async (req, res, next) => {
  try {
    const companyFields = req.body.fields.company;
    const userFields = req.body.fields.user;

    let company = await Company.findOne({ website: companyFields.website }, { strictQuery: true });
    if (!company) {
      let companyObj = {}
      for (const [key, value] of Object.entries(companyFields)) {
        companyObj[key] = value
      }
      company = new Company(companyObj);
    } else {
      for (const [key, value] of Object.entries(companyFields)) {
        company[key] = value;
      }
    }
    await company.save();

    let user = await User.findOne({ email: userFields.email });
    if (!user) {
      let userObj = {}
      for (const [key, value] of Object.entries(userFields)) {
        userObj[key] = value
      }
      user = new User(userObj);
      user.roles = [{
        company: company._id,
        role: "owner"
      }];

      company.roles = [{
        user: user._id,
        role: "owner"
      }];

      await Promise.all([user.save(), company.save()]);
      res.status(201).json(company);
    } else {
      for (const [key, value] of Object.entries(userFields)) {
        user[key] = value
      }
      await user.save();
      res.status(200).json({ message: "Company and user updated" });
    }
  } catch (error) {
    console.log(error)
    res.status(409).json({ message: error.message })
  }
};

exports.updateCompany = async (req, res, next) => {
  try {
    let companyFields = req.body.fields.company;
    let company = await Company.findById(req.body.id)

    for (const [key, value] of Object.entries(companyFields)) {
      // console.log(key + ": " + value)
      company[key] = value
    }
    console.log(company)
    company.save();
    res.status(200).json({ message: "posted" })
  } catch (error) {
    console.log(error)
  }
};

exports.deleteCompany = async (req, res, next) => {
  try {
    console.log('delete company')
    let response = await Company.deleteOne({ _id: req.query.id })
    res.status(200).json({ message: response })
  } catch (error) {
    console.log(error)
  }
};