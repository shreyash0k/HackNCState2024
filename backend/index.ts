import axios from "axios";
import crypto from "crypto";
import "dotenv/config";
import express from "express";
import { MongoClient } from "mongodb";
import { renderDOTToSVG } from "./renderer";

const app = express();
const port = 3000;
const AUTH = process.env.OPEN_AI_AUTH;

const mongoDbUrl = process.env.MONGODB_URL!;
const mongoDbDatabaseName = process.env.MONGODB_DATABASE_NAME!;
const mongoDbCollectionName = process.env.MONGODB_COLLECTION_NAME!;

app.use(express.text());
app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

//need to update //PUT //get ID, code
app.put("/v1/chart", (request, response) => {
	const gpt_query = "Please generate Graphviz code for a flowchart explaining the program below. Try to avoid including code in the flowchart. Instead, make it easily understandable with English explanations. Don't include any explanation in your response; rather, just generate the Graphviz code.\n"


	const {project_id} = request.body;

	const code = request.body.code.toString();

	const codeHash = crypto.createHash("sha256").update(code).digest("hex");

	const checkForHash = async () => {
		const client = new MongoClient(mongoDbUrl);
		try{
			await client.connect();
			const db = client.db(mongoDbDatabaseName);
			const collection = db.collection(mongoDbCollectionName);
			const query = {hash : codeHash};
			const document = await collection.findOne(query);
			if(document&&codeHash){
				response
					.type("svg")
					.send(document.chart_svg);
			}
			else{
				const uri = "https://api.openai.com/v1/chat/completions";

				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${AUTH}`
				}

				const body = {
					"model": "gpt-4",
					"messages": [
						{
							"role": "user",
							"content": `${gpt_query}${code}`
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

						const filter = {project_id}
						const updateDoc = {
							$set: {
								code,
								chart_svg: svgContent,
								hash: crypto.createHash("sha256").update(code).digest("hex")
							}
						};

						const updateResult = await collection.updateOne(filter,updateDoc);
						response
							.type("svg")
							.send(svgContent);
					}
					catch(error) {
							console.error("Failed to fetch SVG:", error);
							response.status(500).send("Failed to load SVG content");
					}
				})
			}
		}
		catch(error){
			console.log(error);
		}
	}
	checkForHash();
});

//create new project
app.post("/v1/projects", (request, response) => {
	const {project_name} = request.body;
	const project_id = crypto.randomUUID();
	const code = "";
	const chart_svg = null;
	const hash = "";
	const timestamp = Date.now();

	const createProject = async() => {
		const client = new MongoClient(mongoDbUrl);
		try{
			await client.connect();
			const db = client.db(mongoDbDatabaseName);
			const collection = db.collection(mongoDbCollectionName);

			const insertResult = await collection.insertOne({
				project_id,
				project_name,
				code,
				chart_svg,
				hash,
				timestamp
			});
			response.json({
				project_id,
				project_name,
				code,
				chart_svg,
				timestamp
			})
		}
		catch(error){
			console.log(error)
		}
		finally{
			await client.close();
		}
	}
	createProject();
});

//get all projects from db
app.get("/v1/projects", (_, response) => {

	const fetchProjects = async() => {
		const client = new MongoClient(mongoDbUrl);
		try{
			await client.connect();
			const db = client.db(mongoDbDatabaseName);
			const collection = db.collection(mongoDbCollectionName);

			const fetchResult = await collection.find({}).toArray();
			response.json({"projects": [...fetchResult]});
		}
		catch(error){
			console.log(error)
		}
		finally{
			await client.close();
		}
	}
	fetchProjects();

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
