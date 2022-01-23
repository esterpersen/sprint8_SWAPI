import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-log-modal',
  template: ``,
  styles: [
  ]
})
export class LogModalComponent {
  currentDialog: NgbModalRef;

  constructor(private modalService: NgbModal, config: NgbModalConfig, route: ActivatedRoute, router: Router) {
    this.currentDialog = this.modalService.open(LoginComponent, { centered: true });

    // Tornar a la pàg on estava quan es tanca el modal
    this.currentDialog.result.then(result => {
      if(result){
      router.navigateByUrl('../');}
    }, reason => {
      router.navigateByUrl('../');
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
