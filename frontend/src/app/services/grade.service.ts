import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { HTTP_PAGEABLE_RESPONSE, HTTP_STANDARD_RESPONSE } from '../models/htttp-response';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGrades(start = 0, end = 50) : Observable<HTTP_PAGEABLE_RESPONSE<any>> {
    return this.http.get<HTTP_PAGEABLE_RESPONSE<any>>(`${this.url}/api/grade/page?pageNumber=${start}&pageSize=${end}`);
  }

  postGrade(data: any): Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.post<HTTP_STANDARD_RESPONSE>(`${this.url}/api/grade`, data);
  }

  updateGrade(id: any, data:any) : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.put<HTTP_STANDARD_RESPONSE>(`${this.url}/api/grade/${id}`, data);
  }

  getGradeById(id: any): Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.get<HTTP_STANDARD_RESPONSE>(`${this.url}/api/grade/${id}`);
  }

  deleteGrade(id: any): Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.delete<HTTP_STANDARD_RESPONSE>(`${this.url}/api/grade/${id}`);
  }

  getAllGrades() : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.get<HTTP_STANDARD_RESPONSE>(`${this.url}/api/grade`);
  }

  getAllGradesBySubjectId(userId: any, subjectId: any): Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.get<HTTP_STANDARD_RESPONSE>(`${this.url}/api/user/${userId}/subject/${subjectId}`);
  }

}
