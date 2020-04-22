import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }


  findAll(): Observable<Project[]>  {
    return this.http.get<any>('http://localhost:8080/project')
  }

  save(project: Project) {
    return this.http.post('http://localhost:8080/project', project)
  }

  delete(id) {
    return this.http.delete('http://localhost:8080/project/' + id)
  }


}
