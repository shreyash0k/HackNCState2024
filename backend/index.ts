import express from "express";
import axios from "axios";
import { renderDOTToSVG } from "./renderer";

const app = express();
const port = 3000;
const AUTH = process.env.OPEN_AI_AUTH;

app.use(express.text());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.post("/v1/post/chart", (request, response) => {
	const query = "Please generate Graphviz code for a flowchart explaining the program below. Try to avoid including code in the flowchart. Instead, make it easily understandable with English explanations. Don't include any explanation in your response; rather, just generate the Graphviz code.\n"

	const code = request.body.toString();

	const uri = "https://api.openai.com/v1/chat/completions";
	
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `${AUTH}`
	}

	const body = {
		"model": "gpt-4",
		"messages": [
			{
				"role": "user",
				"content": `${query}${code}`
			}
		]
	}

	axios({
		method:"post",
		url: uri,
		data: body,
		headers
	})
	.then(async(res) => {
		const openAIResponse = res.data.choices[0].message.content;

		try {
			const svgContent = await renderDOTToSVG(formatOpenAIResponse(openAIResponse));

			response
				.type('svg')
				.send(svgContent);
		}
		catch(error) {
				console.error('Failed to fetch SVG:', error);
				response.status(500).send('Failed to load SVG content');
		}
	})
})

app.listen(port, () => {
	console.log(`The server is running at http://localhost:${port}`);
});

const formatOpenAIResponse = (text:string) => {
	let updatedText = text.trim();
	while(updatedText.charAt(0) == "`"){
		updatedText = updatedText.slice(1);
	}
	while(updatedText.charAt(updatedText.length-1) == "`"){
		updatedText = updatedText.slice(0,-1);
	}
	return updatedText;
}
