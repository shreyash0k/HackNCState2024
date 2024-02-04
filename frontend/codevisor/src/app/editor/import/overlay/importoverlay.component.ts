import { Component, EventEmitter, HostListener, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { EditorFileImportButtonComponent } from "../fileimportbutton/fileimportbutton.component";

@Component({
	selector: "editor-import-overlay",
	standalone: true,
	imports: [EditorFileImportButtonComponent, MatButtonModule, MatIconModule, MatTooltipModule],
	styleUrl: "./importoverlay.component.scss",
	templateUrl: "./importoverlay.component.html"
})
export class EditorImportOverlayComponent {
	@Output() hide = new EventEmitter<null>();
	@Output() import = new EventEmitter<string>();
	pasteEnabled = true;

	constructor() {
		(async () => {
			try {
				const status = await navigator.permissions.query({
					name: "clipboard-read" as PermissionName
				});

				const setPasteEnabled = () => {
					this.pasteEnabled = status.state != "denied";
				}

				status.addEventListener("change", () => setPasteEnabled());

				setPasteEnabled();
			} catch (exception) {
				if (!(exception instanceof TypeError)) {
					throw exception;
				}

				this.pasteEnabled = false;
			}
		})();
	}

	handleAttachedFile(text: string) {
		this.import.emit(text);
		this.hide.emit(null);
	}

	@HostListener("click", ["$event.currentTarget", "$event.target"])
	handleClick(currentTarget: EventTarget, target: EventTarget) {
		if (currentTarget == target) {
			this.hide.emit(null);
		}
	}

	async handlePasteButtonClick() {
		this.import.emit(await navigator.clipboard.readText());
		this.hide.emit(null);
	}
}
