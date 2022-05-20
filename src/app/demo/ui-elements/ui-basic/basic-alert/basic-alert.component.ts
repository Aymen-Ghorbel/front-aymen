import { Component, OnInit } from '@angular/core';
import { clientService } from 'src/app/services/clientService';

@Component({
  selector: 'app-basic-alert',
  templateUrl: './basic-alert.component.html',
  styleUrls: ['./basic-alert.component.scss']
})
export class BasicAlertComponent implements OnInit {

  ClientInfo;

  constructor(private ClientService : clientService) { }

  ngOnInit() {
    this.ClientService.getClientById().subscribe((res)=> {
      this.ClientInfo=res;
      console.log(res);
    });
  }

}
