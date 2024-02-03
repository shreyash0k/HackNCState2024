import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from "@angular/router";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimationsAsync(),
		importProvidersFrom(MonacoEditorModule.forRoot()),
	]
};
