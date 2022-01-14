import { Nau } from '../../shared/interfaces/nau.interface';
import { Component, OnInit } from '@angular/core';
import { NausService } from 'src/app/shared/services/naus.service';

@Component({
  selector: 'app-fitxa-nau',
  templateUrl: './fitxa-nau.component.html',
  styleUrls: ['./fitxa-nau.component.css'],
})
export class FitxaNauComponent implements OnInit {
  constructor(private nausService: NausService) { }
  public nauIndividual: Nau = this.nausService.currentNau;
  public posicioNauIndividual: number = this.nausService.currentNauId;
  public srcImgNauIndividual: string = this.nausService.getImgSrc();
  public clickedNauIdFromSWAPI: number = parseInt(this.nauIndividual.url.split("starships/").pop()!);

  ngOnInit(): void {
    this.getImageOfNau();
  }

  getImageOfNau() {
    this.srcImgNauIndividual += this.clickedNauIdFromSWAPI + '.jpg';
  }
}
