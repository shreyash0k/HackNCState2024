import { Component, ViewChild } from "@angular/core";
import { AngularSplitModule } from "angular-split";
import { EditorComponent } from "./editor/editor.component"
import { HeaderComponent } from "./layout/header/header.component"
import { PreviewComponent } from "./preview/preview.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [AngularSplitModule, EditorComponent, HeaderComponent, PreviewComponent],
	templateUrl: "./app.component.html"
})
export class AppComponent {
	@ViewChild(EditorComponent) editor: EditorComponent | null = null;

	generate() {
		if (this.editor == null) {
			console.error("Error: The editor hasn't been registered yet.");
		} else {
			const code = this.editor.getValue();

			if (code == null) {
				console.error("Error: Didn't get any code from the editor");
			} else {
				console.log(`Code: ${code}`);
			}
		}
	}
}
