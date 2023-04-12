// INSTRUCTIONS

// Tor parseFilters to work, format your api call like this:
// `${this.$root.apiURL}/route/get-something?filter=key:value&filter=key:value`
// Then handle the request like this: parseFilters(req.query.filter)

const parseFilters = (query) => {
  let filters = {}
  if (Array.isArray(query)) {
    for (let item of query) {
      // // console.log(item)
      let keyvalue = item.split(":")
      filters[keyvalue[0]] = keyvalue[1]
    }
  } else {
    let keyvalue = query.split(":")
    filters[keyvalue[0]] = keyvalue[1]
  }
  return filters
}

const valuesToNumbers = (obj) => {
  for (item in obj) {
    obj[item] = Number(obj[item])
    // // console.log(obj[item])
  }
  return obj
}

exports.parseFilters = parseFilters;
exports.valuesToNumbers = valuesToNumbers;



