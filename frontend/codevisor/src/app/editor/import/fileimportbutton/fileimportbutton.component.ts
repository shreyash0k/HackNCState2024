import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
	selector: "editor-file-import-button",
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	styleUrl: "./fileimportbutton.component.scss",
	templateUrl: "./fileimportbutton.component.html"
})
export class EditorFileImportButtonComponent {
	@Input() width: string | null = null;
	@Input() height: string | null = null;
	@Output() import = new EventEmitter<string>();
	@ViewChild("fileInput") fileInput: ElementRef<HTMLInputElement> | null = null;

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
			}
		})

		fileReader.readAsText(files[0]);
	}

	handleAttachFileButtonClick() {
		if (this.fileInput != null) {
			this.fileInput.nativeElement.click();
		}
	}
}
