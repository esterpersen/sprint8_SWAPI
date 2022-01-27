import { Component, OnInit } from '@angular/core';
import { Nau } from '../../interfaces/nau.interface';
import { NausService } from '../../services/naus.service';

@Component({
  selector: 'app-fitxa-nau',
  templateUrl: './fitxa-nau.component.html',
  styleUrls: ['./fitxa-nau.component.css'],
})
export class FitxaNauComponent implements OnInit {
  constructor(private nausService: NausService) { }
  public nauIndividual: Nau = this.getNauFromLocalStorage();
  public posicioNauIndividual: number = this.nausService.currentNauId;
  public srcImgNauIndividual: string = this.nausService.getNauImgSrc();
  public clickedNauIdFromSWAPI: number = parseInt(this.nauIndividual.url.split("starships/").pop()!);

  nauActual!: Nau;

  ngOnInit(): void {
    this.getImageOfNau();
  }

  getImageOfNau() {
    this.srcImgNauIndividual += this.clickedNauIdFromSWAPI + '.jpg';
  }

  getNauFromLocalStorage(): Nau {
    return this.nausService.obtenirNUltimaNauClicada_localStorage();
  }

  getNauFromSWAPI(idNau: number) {
    console.log("idNau: ", idNau);
    this.nausService.getNausPerPage(this.nausService.pageNum).subscribe((elQueEnsTornaLaURL: any) => {
      this.nauActual = elQueEnsTornaLaURL.results[idNau];
    });
  }

}
