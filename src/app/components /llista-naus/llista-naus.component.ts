import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NausService } from 'src/app/shared/services/naus.service';
import { Nau } from 'src/app/shared/interfaces/nau.interface';

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
