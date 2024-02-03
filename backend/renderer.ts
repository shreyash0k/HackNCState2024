import childProcess from "node:child_process"
import stream from "stream";

export async function renderDOTToSVG(code: string): Promise<string> {
	let resultResolve: (result: string) => void;
	const result = new Promise<string>(resolve => {
		resultResolve = resolve;
	});

	const process = childProcess.exec("dot -Tsvg", (_1, stdout, _2) => {
		resultResolve(stdout);
	});

	if (process.stdin == null) {
		return Promise.reject("The subprocess doesn't accept stdin.");
	}

	var stdinStream = new stream.Readable();

	stdinStream.push(code);
	stdinStream.push(null);
	stdinStream.pipe(process.stdin);

	return result;
}
