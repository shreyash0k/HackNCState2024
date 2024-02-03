import { Component } from '@angular/core';
//import mat-card
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [MatCardModule], 
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  svgText: string = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
  </svg>`;
  svgImageDataUri: string = `data:image/svg+xml;base64,${btoa(this.svgText)}`;
}
