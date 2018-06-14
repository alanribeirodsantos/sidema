import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sdm-hints',
  templateUrl: './sdm-hints.component.html',
  styleUrls: ['./sdm-hints.component.scss']
})
export class SdmHintsComponent{
  
  router;

  constructor(private _router: Router){
    this.router = _router;

  }
}
