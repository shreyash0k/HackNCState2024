import { Component } from "@angular/core";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";

@Component({
	selector: "editor",
	standalone: true,
	imports: [MonacoEditorModule],
	styleUrl: "./editor.component.scss",
	templateUrl: "./editor.component.html"
})
export class EditorComponent {
	monacoOptions = {
		automaticLayout: true,
		theme: "vs-dark"
	};
}
