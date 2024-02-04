import { HttpClient } from '@angular/common/http';
import { Component ,inject, OnInit} from '@angular/core';
//import mat-card
import {MatCardModule} from '@angular/material/card';
//import HttpClientModule
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [MatCardModule,HttpClientModule], 
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent implements OnInit{
  svgText: string = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
  </svg>`;
  svgImageDataUri: string = `data:image/svg+xml;base64,${btoa(this.svgText)}`;

  httpClient = inject(HttpClient);
  data:any = [];
  apiUrl = 'http://localhost:3000/v1/post/chart';


  ngOnInit(): void {

    const temp:any = 'function addNumbers(num1, num2) {return num1 + num2;}';

    this.getSvgData(temp);
  }

  getSvgData(input:any){
    this.httpClient.post<any>(this.apiUrl, input)
    .subscribe((data:string)=>{
      console.log(data);
      this.data = data;
    },
    (error)=>{
      console.log("error "+ error);
    });

    
  }

}
