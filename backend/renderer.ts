import childProcess from "node:child_process"
import stream from "stream";

export async function renderDOTToSVG(code: string): Promise<string> {
	let resultResolve: (result: string) => void;
	let resultReject: (error: any) => void;
	const result = new Promise<string>((resolve, reject) => {
		resultResolve = resolve;
		resultReject = reject;
	});

	const process = childProcess.exec("dot -Tsvg", (error, stdout, _) => {
		if (error == null) {
			resultResolve(stdout);
		} else {
			resultReject(error);
		}
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
