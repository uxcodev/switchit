db.persons.aggregate([
  { $match: { gender: "female" } },
  { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
  { $sort: { totalPersons: -1 } }
])

// find only persons older than 50, group by gender, find out how many per gender, find average age, order by total persons per gender.

db.persons.find({ gender: "female" })

// movies

db.movies.find({ 'runtime': { $lt: 60 } })
db.movies.find({ 'name': "The Last Ship" })
db.movies.find({ 'rating.average': { $gt: 7 } })
db.movies.find({ 'genres': "Drama" }) // 'Drama' is in the array
db.movies.find({ 'genres': ["Drama"] }) // 'Drama' is the only item in array
db.movies.find({ 'runtime': { $in: [30, 42] } }) // looks for either value
db.movies.find({ 'runtime': { $nin: [30, 42] } }) // looks with neither value
db.movies.find({ 'rating.average': { $lt: 5 } })
db.movies.find({
  $or: [
    { 'rating.average': { $lt: 5 } },
    { 'rating.average': { $gt: 9 } }
  ]
})

db.movies.find({
  $nor: [
    { 'rating.average': { $lt: 5 } },
    { 'rating.average': { $gt: 9 } }
  ]
})
db.movies.countDocuments({
  $and: [
    { 'rating.average': { $gt: 5 } },
    { 'rating.average': { $lt: 9 } }
  ]
})

db.movies.countDocuments({
  $and: [
    { 'rating.average': { $gt: 7, $lt: 9 } },
    { 'genres': 'Drama' }
  ]
})

db.movies.countDocuments({
  'rating.average': { $gt: 7, $lt: 9 }
})

db.movies.find({
  $and: [
    { 'rating.average': { $gt: 7, $lt: 9 } },
    { 'genres': 'Drama' }
  ]
})

db.movies.find({
  $and: [
    { 'rating.average': { $gt: 9 } },
    { 'genres': 'Drama' }
  ]
})

db.movies.find({
  'rating.average': { $gt: 8, $lt: 9 },
  'runtime': { $gte: 30, $lte: 60 },
  'genres': 'Drama'
})

db.movies.countDocuments({
  $or: [
    { 'genres': 'Drama' },
    { 'genres': 'Horror' },
  ]
})
db.movies.countDocuments({ 'genres': { $in: ['Drama', 'Horror'] } })



db.users.insertMany([
  { name: 'Nick', hobbies: [{ title: 'Sports', frequency: 3 }, { title: 'Cooking', frequency: 6 }], phone: 2505409702 },
  { name: 'Manuel', hobbies: [{ title: 'Cooking', frequency: 5 }, { title: 'Cars', frequency: 2 }], age: 30, phone: 0123234123 }
])

db.users.find({ age: { $exists: true, $gt: 30 } })

db.users.insertOne(
  { name: 'Anna', hobbies: [{ title: 'Sports', frequency: 2 }, { title: 'Yoga', frequency: 3 }], phone: 9928374783, age: null }
)

db.users.find({ age: { $exists: true, $ne: null } })
