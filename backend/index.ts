import express from "express";

const app = express();
const port = 3000;

app.get("/", (_, response) => {
	response.send("Hello, world!");
});

app.listen(port, () => {
	console.log(`The server is running at http://localhost:${port}`);
});
