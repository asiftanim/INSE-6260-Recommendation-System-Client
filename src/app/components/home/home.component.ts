import { Component, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppAuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private _appAuthService: AppAuthService) {}

  x = 5;
  y = 0;
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public logout() {
    this._appAuthService.logout();
  }
}
