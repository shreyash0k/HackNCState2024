import { Component, ViewChild,inject } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { AngularSplitModule } from "angular-split";
import { Project } from "./common/project";
import { EditorComponent } from "./editor/editor.component";
import { HeaderComponent } from "./layout/header/header.component";
import { PreviewComponent } from "./preview/preview.component";
import { ProjectListComponent } from "./projectlist/projectlist.component";
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppServiceService } from "./app-service.service";

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
export class AppComponent {
	@ViewChild(EditorComponent) editor: EditorComponent | null = null;
	menuEnabled = false;
	projects = [
		{
			project_id: "0",
			project_name: "Test Project #1",
			code: 'console.log("Project 1!");',
			chart_svg: "",
			timestamp: 0
		},

		{
			project_id: "1",
			project_name: "Test Project #2",
			code: 'console.log("Project 2!");',
			chart_svg: "",
			timestamp: 0
		},

		{
			project_id: "2",
			project_name: "Test Project #3",
			code: 'console.log("Project 3!");',
			chart_svg: "",
			timestamp: 0
		}
	];

	selectedProject: Project = this.projects[0];
	httpClient = inject(HttpClient);
	apiUrl = 'http://localhost:3000/v1/post/chart';


	constructor(private appService: AppServiceService) {
		
	}
	generate() {
		if (this.editor == null) {
			console.error("Error: The editor hasn't been registered yet.");
		} else {
			const code = this.editor.getValue();

			if (code != null) {
				console.log(`Code: ${code}`);
				this.getSvgData(code);
			}
		}
		//call getSvgfunction to get the svg
		

		//return that svg to the preview component
	}
	

	getSvgData(inputCode:any){
		this.httpClient.post<any>(this.apiUrl, inputCode, {responseType: 'text' as 'json'})
		.subscribe((data:any)=>{
			console.log('SVG data set in service:', data);
			console.log("app.component.ts: getSvgData() called");
			this.appService.changeSvg(data);

		},
		(error)=>{
			console.log("error loading svg data "+ error);
		});
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
}
