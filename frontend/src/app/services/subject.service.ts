import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { HTTP_PAGEABLE_RESPONSE, HTTP_STANDARD_RESPONSE } from '../models/htttp-response';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSubjects(start = 0, end = 50) : Observable<HTTP_PAGEABLE_RESPONSE<any>> {
    return this.http.get<HTTP_PAGEABLE_RESPONSE<any>>(`${this.url}/api/subject/page?pageNumber=${start}&pageSize=${end}`);
  }

  postSubject(data: any): Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.post<HTTP_STANDARD_RESPONSE>(`${this.url}/api/subject`, data);
  }

  updateSubject(id: any, data:any) : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.put<HTTP_STANDARD_RESPONSE>(`${this.url}/api/subject/${id}`, data);
  }

  getSubjectById(id: any): Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.get<HTTP_STANDARD_RESPONSE>(`${this.url}/api/subject/${id}`);
  }

  deleteSubject(id: any): Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.delete<HTTP_STANDARD_RESPONSE>(`${this.url}/api/subject/${id}`);
  }

  getAllSubjects() : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.get<HTTP_STANDARD_RESPONSE>(`${this.url}/api/subject`);
  }

}
