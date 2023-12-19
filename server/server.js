import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from "openai";

dotenv.config();



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,

});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async (req, res) => {
res.status(200).send({
    message: 'Hello from DEANLONG.io Marketing',
})
});

app.post('/',async(req,res) => {
    try{
        const prompt = req.body.prompt;
        const response = await openai.chat.completions.create(
            {
                model: "gpt-3.5-turbo",
                prompt: `Based on https://www.deanlong.io/, act like an assistant of this website,${prompt}`,
                temperature: 0.5, // Higher values means the model will take more risks.
                max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
                top_p: 1, // alternative to sampling with temperature, called nucleus sampling
                frequency_penalty: 0.8, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
                presence_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
                stop: ["/#"], // the "/# will tell the API to stop generating further tokens"
              }
            // model="gpt-3.5-turbo",
            // prompt= `${prompt}`,
            // temperature=0.3,
            // max_tokens=3000,
            // top_p=1,
            // frequency_penalty=0.3,
            // presence_penalty=0
        );
        res.status(200).send({
            bot: response.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error} || 'Something went wrong')


    }
})

app.listen(5173, () => console.log('AI server started on port http://localhost:5173/'));