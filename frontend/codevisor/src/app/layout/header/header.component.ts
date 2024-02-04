import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Project } from "../../common/project";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule],
	styleUrl: "./header.component.scss",
	templateUrl: "./header.component.html"
})
export class HeaderComponent {
	@Input() project: Project | null = null;
	@Output() generate = new EventEmitter<null>();
	@Output() toggleMenu = new EventEmitter<null>();
}
