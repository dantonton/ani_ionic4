import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  zip, of} from 'rxjs';
import { map, flatMap, concatAll, toArray, filter, groupBy, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatafileService {
  

  constructor(private http: HttpClient) { }



  
  //TODO: implementar essa consulta em back-end
  getAniversariantesByDate(date: Date) {
    let hash0a3 = ((date.getDate() + date.getMonth()) %4) + 1;
    return this.http.get("https://reqres.in/api/users?page="+hash0a3)
    .pipe(
      map(results => results['data']),
      flatMap(users => users),
      map(user => `${user['first_name']} ${user['last_name']}` ),
      toArray(),
      map(users=> [{
        "date": date,
        "users": users
      }])
      );
  }

  //TODO: implementar essa consulta em back-end
  getAniversariantesByName(search: string) {
    return this.http.get("https://reqres.in/api/users?per_page=12")
    .pipe(
      map(results => results['data']),
      flatMap(users => users),
      filter(n => n['first_name'].includes(search) || n['last_name'].includes(search)),
      groupBy(user => (user['id'] % 4)+1),
      mergeMap(group =>   zip(of(group.key), group.pipe(
        map(user => `${user['first_name']} ${user['last_name']}` ),
        toArray()))),
      map(x=> [{
        "date": new Date(2019, 4, x[0]),
        "users": x[1]
      }]),
      concatAll(),
      toArray()
      );
  }
  
}
