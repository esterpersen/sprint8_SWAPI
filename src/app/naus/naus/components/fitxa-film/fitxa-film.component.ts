import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NausService } from '../../services/naus.service';
import { Film } from './../../interfaces/film';

@Component({
  selector: 'app-fitxa-film',
  templateUrl: './fitxa-film.component.html',
  styleUrls: ['./fitxa-film.component.css']
})
export class FitxaFilmComponent implements OnInit {

  constructor(private http: HttpClient, private nausService: NausService) {  }

  @Input() linkFilm!: string;
  public currentFilmNumber!: number;
  public srcImgFilmIndividual: string = this.nausService.getFilmImgSrc();
  public filmIndividual!: Film;


  ngOnInit(): void {
    this.createFitxaFilm();
    this.getImageOfFilm();
  }

  getFilm(link: string): Observable<Film> {
    this.linkFilm = link;
    this.currentFilmNumber = parseInt(this.linkFilm.split("films/").pop()!);
    const params = new HttpParams().set(':id', this.currentFilmNumber);
    return this.http.get<Film>(link, { params });
  }

  createFitxaFilm() {
    this.getFilm(this.linkFilm).subscribe(resp => {
      this.filmIndividual = resp;
    })
  }

  getImageOfFilm() {
    this.srcImgFilmIndividual += this.currentFilmNumber + '.jpg';
  }
}
