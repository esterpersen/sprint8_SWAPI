import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Nau } from '../../interfaces/nau.interface';
import { NausService } from '../../services/naus.service';

@Component({
  selector: 'app-llista-naus',
  templateUrl: './llista-naus.component.html',
  styleUrls: ['./llista-naus.component.css'],
})
export class LlistaNausComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document,
    private nausService: NausService) { }

  //* PROPIETATS
  public llistaNausDesDelService!: Nau[];
  showButton: boolean = false;

  //* MÈTODES
  ngOnInit(): void {
    this.nausService.pageNum = 1;
    this.getDataFromSWAPI();
  }

  getDataFromSWAPI() {
    this.nausService.getNausPerPage(this.nausService.pageNum).subscribe((elQueEnsTornaLaURL: any) => {
      this.llistaNausDesDelService = elQueEnsTornaLaURL.results;
    });
  }

  displayIndividualNau(currentNau: Nau, x: number) {
    this.nausService.currentNauId = x;
    this.nausService.currentNau = currentNau;
    this.nausService.guardarUltimaNauClicada_LocalStorage(currentNau);
  }

  //* Scroll infinit
  @HostListener("window:scroll")
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > 150;
  }

  onScrollDown(): void {
    this.nausService.pageNum++;
    this.nausService.getNausPerPage(this.nausService.pageNum).subscribe(
      (elQueEnsTornaLaURL: any) => {
        this.llistaNausDesDelService = [...this.llistaNausDesDelService, ...elQueEnsTornaLaURL.results];
      },
    );
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

}
