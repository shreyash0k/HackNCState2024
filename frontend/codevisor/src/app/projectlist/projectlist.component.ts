import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatListModule } from "@angular/material/list";
import moment from "moment";
import { Project } from "../common/project"

@Component({
	selector: "project-list",
	standalone: true,
	imports: [CommonModule, MatButtonToggleModule, MatListModule],
	styleUrl: "./projectlist.component.scss",
	templateUrl: "./projectlist.component.html"
})
export class ProjectListComponent {
	@Input() projects: Project[] = [];
	@Output() select = new EventEmitter<Project>();

	getProjectCreatedPhrase(project: Project): string {
		return `Created ${moment(project.timestamp).fromNow()}`;
	}
}
