import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable, tap, Subject } from 'rxjs';
import { HTTP_PAGEABLE_RESPONSE, HTTP_STANDARD_RESPONSE, UserResponse } from '../models/htttp-response';
import { LOGIN_DTO } from '../models/login.model';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = environment.apiUrl;
  private roles = [];
  public listener = new Subject();

  constructor(private http: HttpClient) {}



  login(data: LOGIN_DTO) : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.post<HTTP_STANDARD_RESPONSE>(`${this.url}/auth/login`, data)
     .pipe(
      tap(res => {
        localStorage.setItem('token', res.data.token || '')
      })
     );
  }
  
  getRoles() : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.get<HTTP_STANDARD_RESPONSE>(`${this.url}/api/user/${localStorage.getItem('token')}`)
    .pipe(
      tap(res => {
        localStorage.setItem('roles', AES.encrypt(JSON.stringify(res.data.split(',')), environment.secret).toString())
      })
     );
  }

  getUserInfo() : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.get<HTTP_STANDARD_RESPONSE>(`${this.url}/api/user/info/${localStorage.getItem('token')}`)
  }

  isAuthorized(userRoles: Array<String>, rolesToken: any) {
    let roles = AES.decrypt(rolesToken, environment.secret);
    let rolesArray = JSON.parse(roles.toString(enc.Utf8));   
    return rolesArray.some((role:any) => userRoles.includes(role));
    //return false;
  }

  getCurrentRoles(): Array<any> {
    let roles = AES.decrypt((localStorage.getItem('roles') || ''), environment.secret);
    return JSON.parse(roles.toString(enc.Utf8));  
  }

  getUserByPage(pageNumber:number, size:number): Observable<HTTP_PAGEABLE_RESPONSE<UserResponse>> {
    return this.http.get<HTTP_PAGEABLE_RESPONSE<UserResponse>>(`${this.url}/api/user/page?pageNumber=${pageNumber}&pageSize=${size}`);
  }

  deleteUserByEmail(email: string) : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.delete<HTTP_STANDARD_RESPONSE>(`${this.url}/api/user/delete/${email}`);
  }

  createUser(data:any) : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.post<HTTP_STANDARD_RESPONSE>(`${this.url}/auth/register`, data);
  }

  getUserByRole(role: string): Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.get<HTTP_STANDARD_RESPONSE>(`${this.url}/api/user/role/${role}`);
  }

  addSubjectToUser(data: string) : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.post<HTTP_STANDARD_RESPONSE>(`${this.url}/api/user/subject`, data);
  }

  addGradeToUser(data: string) : Observable<HTTP_STANDARD_RESPONSE> {
    return this.http.post<HTTP_STANDARD_RESPONSE>(`${this.url}/api/user/grade`, data);
  }

}
