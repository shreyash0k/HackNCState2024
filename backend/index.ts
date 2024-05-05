import "dotenv/config";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { ParamsDictionary } from "express-serve-static-core";
import { createProject, getOrSetChart, getProjects } from "./database";
import { generateDOT } from "./openai";
import { renderDOTToSVG } from "./renderer";

const app = express();
const port = 3000;

app.use(express.json());
app.use((_, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Allow-Credentials", "true");

    next();
});

app.put(
	"/v1/chart",
	expressAsyncHandler(
		async (
			request: express.Request<ParamsDictionary, any, { projectId: string, code: string }>,
			response
		) => {
			const {projectId, code} = request.body;
			const chartDOT =
				await getOrSetChart(projectId, code, async () => await generateDOT(code));

			const chartSVG = await renderDOTToSVG(chartDOT);

			response.type("svg").send(chartSVG);
		}
	)
);

app.get(
	"/v1/projects",
	expressAsyncHandler(async (_, response) => {
		response.json({
			projects: await getProjects()
		});
	})
);

app.post(
	"/v1/projects",
	expressAsyncHandler(
		async (
			request: express.Request<ParamsDictionary, any, { projectName: string }>,
			response
		) => {
			response.json(await createProject(request.body.projectName));
		}
	)
);

app.listen(port, () => {
	console.log(`The server is running at http://localhost:${port}`);
});
