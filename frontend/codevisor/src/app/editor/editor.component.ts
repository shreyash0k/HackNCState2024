import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { editor } from "monaco-editor"
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { EditorFileImportButtonComponent } from "./import/fileimportbutton/fileimportbutton.component";
import { EditorImportOverlayComponent } from "./import/overlay/importoverlay.component";
import { Project } from "../common/project";

@Component({
	selector: "editor",
	standalone: true,
	imports: [EditorFileImportButtonComponent, EditorImportOverlayComponent, MonacoEditorModule],
	styleUrl: "./editor.component.scss",
	templateUrl: "./editor.component.html"
})
export class EditorComponent {
	_project: Project | null = null;

	get project(): Project | null {
		return this._project;
	}

	@Input()
	set project(project: Project | null) {
		this._project = project;

		this.initializeProject();
	}

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

	handleImport(text: string) {
		if (this.model != null) {
			this.model.setValue(text);
		}
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

			this.initializeProject();
		}
	}

	initializeProject() {
		if (this.model != null) {
			if (this.project != null) {
				this.model.setValue(this.project.code);
			}

			if (this.model.getValue() == "") {
				this.overlayEnabled = true;
				this.changeDetectorRef.detectChanges();
			}
		}
	}
}
