import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
	selector: "create-project-dialog",
	standalone: true,
	imports: [FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
	styleUrl: "./createprojectdialog.component.scss",
	templateUrl: "./createprojectdialog.component.html"
})
export class CreateProjectDialogComponent {
	projectName = ""

	constructor(private matDialogRef: MatDialogRef<CreateProjectDialogComponent>) {}

	handleCancelButtonClick() {
		this.matDialogRef.close()
	}
}
