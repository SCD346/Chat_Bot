const express =  require('express')
const morgan = require("morgan");
require('dotenv').config();
const helmet = require('helmet');
const OpenAI = require('openai');


const PORT = process.env.PORT;
const app = express()
// const { Configuration, OpenAIApi } = require("openai")
// import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});


app.use(express.static('public'))
app.use(morgan("dev"));
// Use helmet middleware with the desired referrerPolicy
app.use(helmet({
  referrerPolicy: { policy: 'same-origin' } // Set to 'same-origin' or other desired policy
}));

app.post('/chat', async (req, res)=> {   
  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: "Hello"}
        ]  
    })           
        
    res.status(200).json({message: resp.data.choices[0].message.content})
  } catch(e) {
      res.status(400).json({message: e.message})
  }
})

app.listen(PORT, ()=> {
    console.log("Server is active")
})

