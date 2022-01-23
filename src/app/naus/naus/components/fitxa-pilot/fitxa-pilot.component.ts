import { Component, Input, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilot } from '../../interfaces/pilot.interface';
import { NausService } from '../../services/naus.service';

@Component({
  selector: 'app-fitxa-pilot',
  templateUrl: './fitxa-pilot.component.html',
  styleUrls: ['./fitxa-pilot.component.css']
})
export class FitxaPilotComponent implements OnInit {

  constructor(private http: HttpClient, private nausService: NausService) {  }

  @Input() linkPilot!: string;
  public currentPilotNumber!: number;
  public srcImgPilotIndividual: string = this.nausService.getPilotImgSrc();
  public pilotIndividual!: Pilot;

  ngOnInit(): void {
    this.createFitxaPilot();
    this.getImageOfNPilot();
  }

  getPilot(link: string): Observable<Pilot> {
    this.linkPilot = link;
    this.currentPilotNumber = parseInt(this.linkPilot.split("people/").pop()!);
    const params = new HttpParams().set(':id', this.currentPilotNumber);
    return this.http.get<Pilot>(link, { params });
  }

  createFitxaPilot() {
    this.getPilot(this.linkPilot).subscribe(resp => {
      this.pilotIndividual = resp;
    })
  }

  getImageOfNPilot() {
    this.srcImgPilotIndividual += this.currentPilotNumber + '.jpg';
  }
}
