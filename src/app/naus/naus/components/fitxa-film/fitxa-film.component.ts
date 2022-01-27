import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../interfaces/film.interface';
import { NausService } from '../../services/naus.service';

@Component({
  selector: 'app-fitxa-film',
  templateUrl: './fitxa-film.component.html',
  styleUrls: ['./fitxa-film.component.css']
})
export class FitxaFilmComponent implements OnInit {

  constructor(private nausService: NausService) { }

  @Input() linkFilm!: string;
  public currentFilmNumber!: number;
  public srcImgFilmIndividual: string = this.nausService.getFilmImgSrc();
  public filmIndividual: Film={
    title: '',
    episode_id: 0,
    opening_crawl: '',
    director: '',
    producer: '',
    release_date: "",
    species: [],
    starships: [],
    vehicles: [],
    characters: [],
    planets: [],
    url: '',
    created: '',
    edited: ''
  };

  ngOnInit(): void {
    this.getFilm(this.linkFilm);
    this.getImageOfFilm();
  }

  getFilm(link: string): Film {
    this.linkFilm = link;
    this.currentFilmNumber = parseInt(this.linkFilm.split("films/").pop()!);

    this.nausService.getFilm(this.linkFilm, this.currentFilmNumber).subscribe(resp => {
      this.filmIndividual = resp;
    })

    return this.filmIndividual;
  }

  getImageOfFilm() {
    this.srcImgFilmIndividual += this.currentFilmNumber + '.jpg';
  }
}
