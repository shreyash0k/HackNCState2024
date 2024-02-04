import { ChangeDetectorRef, Component } from "@angular/core";
import { editor } from "monaco-editor"
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { EditorImportOverlayComponent } from "./importoverlay/importoverlay.component";

@Component({
	selector: "editor",
	standalone: true,
	imports: [EditorImportOverlayComponent, MonacoEditorModule],
	styleUrl: "./editor.component.scss",
	templateUrl: "./editor.component.html"
})
export class EditorComponent {
	model: editor.ITextModel | null = null;
	monacoOptions = {
		automaticLayout: true,
		theme: "vs-dark"
	};

	overlayEnabled = false;

	constructor(private changeDetectorRef: ChangeDetectorRef) {}

	getValue(): string | null {
		return this.model == null ? null : this.model.getValue();
	}

	handleImportOverlayHide() {
		this.overlayEnabled = false;
	}

	handleInit(editor_: editor.IEditor) {
		const model = editor_.getModel();

		if (model == null) {
			console.error("Error: Expected the editor to provide a model.");
		} else if (!("getValue" in model)) {
			console.error("Error: Expected the editor model to be an ITextModel.");
		} else {
			this.model = model;

			if (this.model.getValue() == "") {
				this.overlayEnabled = true;
				this.changeDetectorRef.detectChanges();
			}
		}
	}

	handlePaste(text: string) {
		if (this.model != null) {
			this.model.setValue(text);
		}
	}
}
