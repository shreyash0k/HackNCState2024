import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";

@Component({
	selector: "editor-import-overlay",
	standalone: true,
	imports: [MatButtonModule, MatIconModule, MatTooltipModule],
	styleUrl: "./importoverlay.component.scss",
	templateUrl: "./importoverlay.component.html"
})
export class EditorImportOverlayComponent {
	@Output() hide = new EventEmitter<null>();
	@Output() import = new EventEmitter<string>();
	@ViewChild("fileInput") fileInput: ElementRef<HTMLInputElement> | null = null;
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

	handleAttachedFile() {
		if (this.fileInput == null) {
			return;
		}

		const files = this.fileInput.nativeElement.files;

		if (files == null) {
			return;
		}

		const fileReader = new FileReader();

		fileReader.addEventListener("load", () => {
			const result = fileReader.result;

			if (typeof result == "string") {
				this.import.emit(result);
				this.hide.emit(null);
			}
		})

		fileReader.readAsText(files[0]);
	}

	handleAttachFileButtonClick() {
		if (this.fileInput != null) {
			this.fileInput.nativeElement.click();
		}
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
