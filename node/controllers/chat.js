// const queries = require('../util/queries')
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


exports.completion = async (req, res, next) => {
  let messages = req.body.messages;

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful assistant. Please respond based on the user's language." },
        ...(messages || []).map((message) => {
        if(message.role === 'user') {
          return {role: "user", content: message.content};
        } else {
          return {role: "assistant", content: message.content};
        }
      })
    ],
    max_tokens: 2000,
  });

  let response = chatCompletion.data.choices[0].message.content.trim();
  console.log('completion: ', chatCompletion)
  console.log('response: ', response)
  // response = JSON.stringify(response);
  // console.log('response:', limit(response, 200));
  res.status(200).json({role: 'assistant', content: response});
}