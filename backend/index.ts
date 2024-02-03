import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.get("/", (_, response) => {
	response.send("Hello, world!");
});

app.post("/generate-response", (request, response) => {
	const query = "Please generate Graphviz code for a flowchart explaining the program below. Try to avoid including code in the flowchart. Instead, make it easily understandable with English explanations. Don't include any explanation in your response; rather, just generate the Graphviz code.\n"

	const code = "console.log(\"Hello World\")";

	const uri = "https://api.openai.com/v1/chat/completions";
	const auth = process.env.OPEN_AI_AUTH;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `${auth}`
	}

	const body = {
		"model": "gpt-4",
		"messages": [
			{
				"role": "user",
				"content": `${query+code}`
			}
		]
	}

	axios({
		method:"post",
		url: uri,
		data: body,
		headers
	})
	.then((res) => {
		console.log(res.data.choices[0].message.content);
		response.json(res.data.choices[0].message.content);
	})
})

app.listen(port, () => {
	console.log(`The server is running at http://localhost:${port}`);
});
