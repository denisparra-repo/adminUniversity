import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { HTTP_PAGEABLE_RESPONSE, HTTP_STANDARD_RESPONSE } from '../models/htttp-response';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCourses(start = 0, end = 50) : Observable<HTTP_PAGEABLE_RESPONSE<any>> {
    return this.http.get<HTTP_PAGEABLE_RESPONSE<any>>(`${this.url}/api/course/page?pageNumber=${start}&pageSize=${end}`);
  }

  postCourse(data: any): Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.post<HTTP_STANDARD_RESPONSE>(`${this.url}/api/course`, data);
  }

  updateCourse(id: any, data:any) : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.put<HTTP_STANDARD_RESPONSE>(`${this.url}/api/course/${id}`, data);
  }

  getCourseById(id: any): Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.get<HTTP_STANDARD_RESPONSE>(`${this.url}/api/course/${id}`);
  }

  deleteCourse(id: any): Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.delete<HTTP_STANDARD_RESPONSE>(`${this.url}/api/course/${id}`);
  }

  getAllCourses() : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.get<HTTP_STANDARD_RESPONSE>(`${this.url}/api/course`);
  }

  assignSubjectToCourse(data: any) {
    return this.http.post<HTTP_STANDARD_RESPONSE>(`${this.url}/api/course/subject`, data);
  }
}
