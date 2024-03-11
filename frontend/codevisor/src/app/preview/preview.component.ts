import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
//import mat-card
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { Project } from '../common/project';


@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  _project: Project | null = null;
  httpClient = inject(HttpClient);
  svgText: string | null = null;

  get project(): Project | null {
    return this._project;
  }

  @Input()
  set project(project: Project | null) {
    this._project = project;

    if (project == null) {
      this.svgText = null;
    } else {
      this.httpClient
        .put("http://localhost:3000/v1/chart", {
          "projectId": project.projectId,
          "code": project.code,
        }, {
          responseType: "text"
        })
        .subscribe(response => this.svgText = response.toString());
    }
  }

  getSVGImageDataURI(): string | null {
    if (this.svgText == null) {
      return null;
    }

    return `data:image/svg+xml;base64,${btoa(this.svgText)}`;
  }
}
