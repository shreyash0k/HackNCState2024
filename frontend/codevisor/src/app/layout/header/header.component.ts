import { Component, EventEmitter, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule],
	styleUrl: "./header.component.scss",
	templateUrl: "./header.component.html"
})
export class HeaderComponent {
	@Output() generate = new EventEmitter<null>();
	@Output() toggleMenu = new EventEmitter<null>();
}
