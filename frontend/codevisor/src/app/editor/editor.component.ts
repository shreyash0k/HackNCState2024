import { Component } from "@angular/core";
import { editor } from "monaco-editor"
import { MonacoEditorModule } from "ngx-monaco-editor-v2";

@Component({
	selector: "editor",
	standalone: true,
	imports: [MonacoEditorModule],
	styleUrl: "./editor.component.scss",
	templateUrl: "./editor.component.html"
})
export class EditorComponent {
	model: editor.ITextModel | null = null;
	monacoOptions = {
		automaticLayout: true,
		theme: "vs-dark"
	};

	getValue(): string | null {
		return this.model == null ? null : this.model.getValue();
	}

	onInit(editor_: editor.IEditor) {
		const model = editor_.getModel();

		if (model == null) {
			console.error("Error: Expected the editor to provide a model.");
		} else if (!("getValue" in model)) {
			console.error("Error: Expected the editor model to be an ITextModel.");
		} else {
			this.model = model;
		}
	}
}
