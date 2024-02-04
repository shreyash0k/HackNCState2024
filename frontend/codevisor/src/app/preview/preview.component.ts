import { Component ,inject, OnInit,AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AppServiceService } from "../app-service.service";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';






@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [MatCardModule,HttpClientModule, MatProgressSpinnerModule,CommonModule], 
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})

export class PreviewComponent implements OnInit{
     svgText:string = '';
     isLoading =1;
  constructor(private sanitizer: DomSanitizer,private appService: AppServiceService) {

  }


  ngOnInit(): void {


    this.appService.currentSvg.subscribe(svg =>{
      

     
        this.svgText = svg;
        this.getSafeHtml(this.svgText);
        this.isLoading = 0;

      
      


    } );

   
   
  }
  getSafeHtml(svgText: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgText);

  }

  
}
