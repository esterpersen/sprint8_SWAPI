import { Component, Input, OnInit } from '@angular/core';
import { Pilot } from '../../interfaces/pilot.interface';
import { NausService } from '../../services/naus.service';

@Component({
  selector: 'app-fitxa-pilot',
  templateUrl: './fitxa-pilot.component.html',
  styleUrls: ['./fitxa-pilot.component.css']
})
export class FitxaPilotComponent implements OnInit {

  constructor(private nausService: NausService) { }

  @Input() linkPilot!: string;
  public currentPilotNumber!: number;
  public srcImgPilotIndividual: string = this.nausService.getPilotImgSrc();
  public pilotIndividual: Pilot = {
    name: "",
    birth_year: "",
    eye_color: "",
    gender: "",
    hair_color: "",
    height: "",
    mass: "",
    skin_color: "",
    homeworld: "",
    films: [],
    species: [],
    starships: [],
    vehicles: [],
    url: "",
    created: "",
    edited: ""
  };

  ngOnInit(): void {
    this.getPilot(this.linkPilot);
    this.getImageOfPilot();
  }

  getPilot(link: string): Pilot {
    this.linkPilot = link;
    this.currentPilotNumber = parseInt(this.linkPilot.split("people/").pop()!);

    this.nausService.getPilot(this.linkPilot, this.currentPilotNumber).subscribe(resp => {
      this.pilotIndividual = resp;
    });

    return this.pilotIndividual;
  }

  getImageOfPilot() {
    this.srcImgPilotIndividual += this.currentPilotNumber + '.jpg';
  }
}
