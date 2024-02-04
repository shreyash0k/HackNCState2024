import express from "express";
import axios from "axios";
import crypto from "crypto";
import { renderDOTToSVG } from "./renderer";
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const AUTH = process.env.OPEN_AI_AUTH;

const mongoUrl = 'mongodb://localhost:27017';
const mongodbName = 'projects_db';
const mongoCollectionName = 'projects'

app.use(express.text());
app.use(express.json());

//need to update //PUT //get ID, code
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
			const svgContent = await renderDOTToSVG(openAIResponse);
			response
				.type('svg')
				.send(svgContent);
		}
		catch(error) {
				console.error('Failed to fetch SVG:', error);
				response.status(500).send('Failed to load SVG content');
		}
	})
});

//create new project
app.post("/v1/post/project", (request, response) => {
	const {project_name} = request.body;
	const project_id = crypto.randomUUID();
	const code = "";
	const chart_svg = "";
	const hash = "";
	const timestamp = Date.now();

	const createProject = async() => {
		const client = new MongoClient(mongoUrl);
		try{
			await client.connect();
			const db = client.db(mongodbName);
			const collection = db.collection(mongoCollectionName);

			const insertResult = await collection.insertOne({
				project_id,
				project_name,
				code,
				chart_svg,
				hash,
				timestamp
			});
			console.log(insertResult);
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
app.get("/v1/get/projects", (_, response) => {

	const fetchProjects = async() => {
		const client = new MongoClient(mongoUrl);
		try{
			await client.connect();
			const db = client.db(mongodbName);
			const collection = db.collection(mongoCollectionName);

			const fetchResult = await collection.find({}).toArray();
			console.log(fetchResult);
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
