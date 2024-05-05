import axios from "axios";

function formatResponse(response: string): string {
	let i = 0;

	while (i < response.length && response.charAt(i) == "`") {
		i++;
	}

	let j = response.length - 1;

	while (j >= 0 && response.charAt(j) == "`") {
		j--;
	}

	const result = response.slice(i, j + 1);

	if (result.startsWith("dot\n")) {
		return result.slice("dot\n".length);
	}

	if (result.startsWith("graphviz\n")) {
		return result.slice("graphviz\n".length);
	}

	return result;
}

export async function generateDOT(code: string): Promise<string> {
	const gptQuery = `\
Please generate Graphviz code for a flowchart explaining the program below. Try to avoid including code in the flowchart. Instead, make it easily understandable with English explanations. Don't include any explanation in your response; rather, just generate the Graphviz code.

${code}`;

	const body = {
		"model": "gpt-3.5-turbo-0125",
		"messages": [
			{
				"role": "user",
				"content": gptQuery
			}
		]
	};

	const response = await axios({
		method:"post",
		url: "https://api.openai.com/v1/chat/completions",
		data: body,
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${process.env.OPENAI_AUTH!}`
		}
	});

	const gptResponse = response.data.choices[0].message.content;

	return formatResponse(gptResponse);
}
