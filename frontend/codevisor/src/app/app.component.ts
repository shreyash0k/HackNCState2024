import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { AngularSplitModule } from "angular-split";
import { Project } from "./common/project";
import { EditorComponent } from "./editor/editor.component";
import { HeaderComponent } from "./layout/header/header.component";
import { PreviewComponent } from "./preview/preview.component";
import { ProjectListComponent } from "./projectlist/projectlist.component";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		AngularSplitModule,
		EditorComponent,
		HeaderComponent,
		PreviewComponent,
		ProjectListComponent,
		MatSidenavModule
	],

	styleUrl: "./app.component.scss",
	templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
	@ViewChild(EditorComponent) editor: EditorComponent | null = null;
	menuEnabled = false;
	projects: Project[] = [];
	selectedProject: Project = this.projects[0];

	constructor(private httpClient: HttpClient) {}

	generate() {
		if (this.editor == null) {
			console.error("Error: The editor hasn't been registered yet.");
		} else {
			const code = this.editor.getValue();

			if (code != null) {
				console.log(`Code: ${code}`);
			}
		}
	}

	handleProjectCreate(projectName: string) {
		this.projects.unshift({
			project_id: this.projects.length.toString(),
			project_name: projectName,
			code: "",
			chart_svg: "",
			timestamp: 0
		})
	}

	handleProjectSelect(project: Project) {
		this.selectedProject = project;
		this.menuEnabled = false;
	}

	ngOnInit() {
		this.httpClient.get("http://localhost:3000/v1/projects").subscribe(response => {
			if (!("projects" in response)) {
				console.log('Error: Expected a "projects" in the response body.');
			} else {
				this.projects = response.projects as Project[];
				this.projects.sort((project1, project2) => project2.timestamp - project1.timestamp);
			}
		});
	}
}
