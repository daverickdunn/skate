import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface NewPark {
  name?: string | null
  lat?: string | null
  lng?: string | null
}


@Injectable({
  providedIn: 'root',
})
export class ParksService {

  constructor(private httpClient: HttpClient) { }

  public getParks() {
    return this.httpClient.get('/api/v1/parks')
  }

  public postPark(body: NewPark) {
    return this.httpClient.post('/api/v1/parks', body)
  }

}
