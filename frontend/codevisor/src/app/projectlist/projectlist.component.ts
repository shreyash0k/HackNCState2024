import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import moment from "moment";
import { Project } from "../common/project"
import { CreateProjectDialogComponent } from "./createprojectdialog/createprojectdialog.component";

@Component({
	selector: "project-list",
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule],
	styleUrl: "./projectlist.component.scss",
	templateUrl: "./projectlist.component.html"
})
export class ProjectListComponent {
	@Input() projects: Project[] = [];
	@Output() create = new EventEmitter<string>();
	@Output() select = new EventEmitter<Project>();

	constructor(private matDialog: MatDialog) {}

	getProjectCreatedPhrase(project: Project): string {
		return `Created ${moment(project.timestamp).fromNow()}`;
	}

	handleCreateProjectButtonClick() {
		this.matDialog
			.open(CreateProjectDialogComponent, {
				width: "25rem"
			})
			.afterClosed()
			.subscribe(result => {
				this.create.emit(result.toString());
			});
	}
}
