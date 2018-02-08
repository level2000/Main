import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { findLast } from '@angular/compiler/src/directive_resolver';
// import { AssignmentService } from '../../assignment/assignment.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-client-list-component',
  templateUrl: './client-list-component.html'
})
export class ClientListComponent implements OnInit {

  clients: Client[];
  count: number;
  selectedClientId: number;
  selectedClient: Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getClients();
    this.route.params.subscribe(
      params => {
        this.selectedClientId = params['id'];
      }
    );
  }

  getClients(): void {
    this.clientService.getClients()
      .then(clients => {
        this.clients = clients;
        if (this.clients) {
          this.count = this.clients.length;
          this.selectClient();
        }
      });
  }

  selectClient(): void {
    if (this.selectedClientId) {
      this.selectedClient = this.findClient();
      console.log('selectClient(): '
        + this.selectedClient.Id
        + ' '
        + this.selectedClient.longName);
    } else {
      console.log('selectClient(): No selectedClientId.');
    }
  }

  findClient(): Client {
    console.log('findClient with Id ' + this.selectedClientId);
    if (this.clients) {
      for (let i = 0; i < this.count; i++) {
        if ( this.clients[i].Id.toString() === this.selectedClientId.toString() ) {
          console.log('found client ' + this.clients[i].longName);
          return this.clients[i];
        }
      }
    }
    console.log('Client with Id ' + this.selectedClientId + ' NOT FOUND in list of ' + this.clients.length + ' clients!!!');
  }

}
