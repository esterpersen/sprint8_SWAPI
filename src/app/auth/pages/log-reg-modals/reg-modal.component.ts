import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { RegistreComponent } from '../registre/registre.component';

@Component({
  selector: 'app-reg-modal',
  template: ``,
  styles: [
  ]
})
export class RegModalComponent {
  currentDialog: NgbModalRef;

  constructor(private modalService: NgbModal, config: NgbModalConfig, route: ActivatedRoute, router: Router) {
    this.currentDialog = this.modalService.open(RegistreComponent, { centered: true });

    // Tornar a la pàg on estava quan es tanca el modal
    this.currentDialog.result.then(result => {
      router.navigateByUrl('/');
    }, reason => {
      router.navigateByUrl('/');
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
