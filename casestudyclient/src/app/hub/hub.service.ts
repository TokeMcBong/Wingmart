import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hub } from '@app/hub/hub';
import { GenericHttpService } from '@app/generic-http.service';
@Injectable({
  providedIn: 'root',
})
export class HubService extends GenericHttpService<Hub> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `hubs`);
  } // constructor
} // HubService
