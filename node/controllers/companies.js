const Company = require("../models/company");
const User = require("../models/user");

exports.getCompanies = async (req, res, next) => {
  let companies = await Company.find()
  res.status(200).json(companies)
}

// exports.getCompanyByEmail = async (req, res, next) => {
//   let company = await Company.findOne({ email: req.query.email })
//   res.status(200).json(company)
// }

exports.createCompany = (req, res, next) => {
  let companyFields = req.body.fields;
  let profileObj = {}
  for (const [key, value] of Object.entries(companyFields)) {
    // console.log(`${key}: ${value}`)
    profileObj[key] = value
  }
  const company = new Company(profileObj)
  company.save()
  res.status(200).json(company)

};

exports.signupCompany = async (req, res, next) => {
  let companyFields = req.body.fields.company;
  let companyObj = {}
  let company
  let user

  // see if company is already in database
  // if so, return. if not, create it

  // companyExists = await Company.findOne({ website: companyFields.website }, { strictQuery: true },)
  // console.log(companyExists)
  // if (!companyExists) {
  for (const [key, value] of Object.entries(companyFields)) {
    companyObj[key] = value
  }
  company = new Company(companyObj)
  // } else {
  // company = companyExists // DELETE FOR PROD - this will overwrite existing companies
  // res.status(200).json({ message: "Company already exists" })  UNCOMMENT FOR PROD
  // }
  console.log(company)

  // see if user is already in database, if not create it

  let userFields = req.body.fields.user;
  userExists = await User.findOne({ email: userFields.email })

  if (!userExists) {
    let userObj = {}
    for (const [key, value] of Object.entries(userFields)) {
      userObj[key] = value
    }
    user = new User(userObj)
    user.roles = []
  } else {
    console.log('user already exists')
    user = userExists
    if (!user.roles) {
      user.roles = []
    }
  }

  // add role to user

  user.roles.push({
    company: company._id,
    role: "owner"
  })

  // add role to company

  company.roles = [{
    user: user._id,
    role: "owner"
  }]

  company.save()
  user.save()

  // return created company

  res.status(200).json(company)

};

exports.updateCompany = async (req, res, next) => {
  let companyFields = req.body.fields;
  let company = await Company.findById(req.body.id)

  for (const [key, value] of Object.entries(companyFields)) {
    console.log(key + ": " + value)
    company[key] = value
  }
  company.save();

  res.status(200).json({ message: "posted" })
};

exports.deleteCompany = async (req, res, next) => {
  let response = await Company.deleteOne({ _id: req.query.id })
  res.status(200).json({ message: response })
};