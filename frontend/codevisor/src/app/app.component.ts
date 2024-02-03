import { Component } from "@angular/core";
import { AngularSplitModule } from "angular-split";
import { EditorComponent } from "./editor/editor.component"
import { HeaderComponent } from "./layout/header/header.component"

@Component({
	selector: "app-root",
	standalone: true,
	imports: [AngularSplitModule, EditorComponent, HeaderComponent],
	templateUrl: "./app.component.html"
})
export class AppComponent {}
