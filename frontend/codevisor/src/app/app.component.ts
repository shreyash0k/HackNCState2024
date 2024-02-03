import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";


@Component({
	selector: "app-root",
	standalone: true,
	imports: [HeaderComponent, RouterOutlet,FooterComponent],
	template: `
		<app-header/>
		<router-outlet/>
		<app-footer/>
	`,

	styles: [],
})
export class AppComponent {}
