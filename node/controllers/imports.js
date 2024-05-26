// const queries = require('../util/queries')
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.test = async (req, res, next) => {
  // just send a response
  res.status(200).json({ message: "Success" });
}

exports.getMapping = async (req, res, next) => {
  let table = req.body.table;
  const jsonString = JSON.stringify(table, null, 2);

  const prompt = `
  Please generate a Python dictionary that maps fields in a JSON object to fields in a database. The JSON object is:
    
  ${jsonString}
  
  The database fields are as follows:
  
  - first_name
  - last_name
  - company
  - email
  - phone
  
  The dictionary should have the following format (field names could be different - use exact names from the JSON data):
  
  {
    first_name: [json_key],
    last_name: [json_key],
    company: [json_key],
    email: [json_key],
    phone: [json_key, json_key]
  }
  
  Use the keys from the JSON object in place of json_key. Figure out which keys are most related to which database fields. Please return only the Python dictionary as a JSON object without any additional text or explanation:
  `
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    max_tokens: 2000,
  });

  let response = chatCompletion.data.choices[0].message.content.trim();
  console.log('completion: ', chatCompletion)
  console.log('response: ', response)
  // response = JSON.stringify(response);
  // console.log('response:', limit(response, 200));
  res.status(200).json(response);
},

  exports.getMappingFields = async (req, res, next) => {
    let csvFields = req.body.fields;
    console.log('table: ', csvFields)
    if (!csvFields) {
      return
    }
    csvFields = JSON.stringify(csvFields, null, 2);
    const prompt = `
  Please generate a Python dictionary that maps fields in csvFields to fields in a database. The csvFields array is:
    
  ${csvFields}
  
  The database fields are as follows:
  
  - first_name
  - last_name
  - company
  - email
  - phone
  
  The dictionary should have the following format (field names could be different - Use the fields from the csvFields in place of csvField):
  
  {
    first_name: [csvField1],
    last_name: [csvField2],
    full_name: [csvField2],
    company: [csvField3],
    email: [csvField4],
    phone: [csvField5, csvField6]
  }
  
  Figure out which keys are most related to which database fields. 
  If csvFields has full names, but no first and last names in separate columns, leave first_name and last_name empty. 
  If csvFields has first and last names in separate fields, leave full_name empty.
  Please return only the dictionay as a JSON object without any additional text or explanation:
  `
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "{}" },
        { role: "user", content: prompt },
      ],
      max_tokens: 2000,
    });

    let response = chatCompletion.data.choices[0].message.content.trim();
    console.log('completion: ', response)
    // console.log('response: ', response)
    // response = JSON.stringify(response);
    // console.log('response:', limit(response, 200));
    res.status(200).json(response);
  };