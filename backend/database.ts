import crypto from "crypto";
import { Collection, Db, MongoClient } from "mongodb";

const mongoDbUrl = process.env.MONGODB_URL!;
const mongoDbDatabaseName = process.env.MONGODB_DATABASE_NAME!;
const mongoDbCollectionName = process.env.MONGODB_COLLECTION_NAME!;

interface Project {
	projectId: string;
	projectName: string;
	code: string | null;
	codeHash: string | null;
	chartSvg: string | null;
	timestamp: number;
}

async function withDatabase<A>(fn: (database: Db) => A): Promise<A> {
	const client = await new MongoClient(mongoDbUrl).connect();
	const database = client.db(mongoDbDatabaseName);
	const result = await fn(database);

	await client.close();

	return result;
}

async function withProjects<A>(fn: (collection: Collection<Project>) => A): Promise<A> {
	return withDatabase(database => {
		const collection = database.collection<Project>(mongoDbCollectionName);

		return fn(collection);
	});
}

export async function createProject(projectName: string): Promise<Project> {
	return withProjects(async collection => {
		const project = {
			projectId: crypto.randomUUID(),
			projectName,
			code: null,
			codeHash: null,
			chartSvg: null,
			timestamp: Date.now()
		};

		await collection.insertOne(project);

		return project;
	});
}

export async function getOrSetChart(
	projectId: string,
	code: string,
	chartSvg: () => Promise<string>
): Promise<string> {
	return withProjects(async collection => {
		const codeHash = crypto.createHash("sha256").update(code).digest("hex");
		const project = await collection.findOne({
			codeHash,
		});

		if (project != null && project.chartSvg != null) {
			return project.chartSvg;
		}

		const cachedChartSvg = await chartSvg();

		await collection.updateOne({
			projectId,
		}, {
			$set: {
				code,
				codeHash,
				chartSvg: cachedChartSvg,
			}
		});

		return cachedChartSvg;
	});
}

export async function getProjects(): Promise<Project[]> {
	return withProjects(collection => collection.find().toArray());
}
