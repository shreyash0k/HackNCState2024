import { Component } from "@angular/core";

import { AngularSplitModule } from "angular-split";
import { EditorComponent } from "./editor/editor.component"
import { HeaderComponent } from "./layout/header/header.component"
import { PreviewComponent } from "./preview/preview.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [  AngularSplitModule,EditorComponent, HeaderComponent, PreviewComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css"
})
export class AppComponent {}
