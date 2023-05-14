import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee-detail/employee';

@Injectable()
export class EmployeeService {

  url: string = 'http://localhost:3000/employees'
  constructor(
    private http: HttpClient
  ) { }

  getEmployee(name?: string): Observable<any> {
    const params = new HttpParams().set('name_like', name || '')
    return this.http.get(this.url, {params});
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(this.url+'/' + id);
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.url, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.http.put(this.url+'/'+id, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.url+'/'+id);
  }
}
