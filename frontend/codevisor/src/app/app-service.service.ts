import { Injectable ,inject} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import httpclientmodule


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  
  private svgSource = new BehaviorSubject<string>('');
  currentSvg = this.svgSource.asObservable();
  constructor() {
    
  }
  changeSvg(svg: any) {
    console.log("app-service.service.ts: changeSvg() called");
    this.svgSource.next(svg)
  }
  
}
