import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nau } from '../interfaces/nau.interface';

@Injectable({
  providedIn: 'root'
})
export class NausService {
  constructor(private http: HttpClient) { }

  //* PROPIETATS
  private nausUrl: string = 'https://swapi.py4e.com/api/starships';
  private imgsNausUrl: string = 'https://starwars-visualguide.com/assets/img/starships/';
  private imgsPilotsUrl: string = 'https://starwars-visualguide.com/assets/img/characters/';
  public currentNauId: number = 0;
  public currentNau!: Nau;
  public pageNum: number = 1;

  //* MÈTODES
  public getNauImgSrc(): string {
    return this.imgsNausUrl;
  }

  public getPilotImgSrc(): string {
    return this.imgsPilotsUrl;
  }

  //* retornar resultats d la pag X del llistat de naus de la SWAPI
  public getNausPerPage(x: number): Observable<Nau[]> {

    const params = new HttpParams().set('page', x);
    return this.http.get<Nau[]>(`${this.nausUrl}`, { params });
  }

  //* guardar al localStorage el num de nau clicada per últim cop
  public guardarUltimaNauClicada_LocalStorage(nau: Nau): void{
    localStorage.setItem("Última Nau Vista", JSON.stringify(nau));
  }

  public obtenirNUltimaNauClicada_localStorage(): Nau {
    return JSON.parse(localStorage.getItem("Última Nau Vista")!);
  }

}
