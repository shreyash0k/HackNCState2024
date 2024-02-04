import { Injectable ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import httpclientmodule


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  inputCode:String = "";
  apiUrl = 'http://localhost:3000/api/preview';


  constructor(private http: HttpClient) {}


  getSvgFromApi(rawInput: string): Observable<string> {
    // You may need to adjust the API endpoint and request type based on your API specifications
    const requestData = { input: rawInput };

    return this.http.post<string>(this.apiUrl, requestData);
  }
}
