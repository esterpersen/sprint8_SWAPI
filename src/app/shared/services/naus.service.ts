import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nau } from '../interfaces/nau.interface';

@Injectable({
  providedIn: 'root'
})
export class NausService {
  constructor(private http: HttpClient) { }
  //* PROPIETATS
  private nausUrl: string = 'https://swapi.py4e.com/api/starships';
  private imgsUrl: string = 'https://starwars-visualguide.com/assets/img/starships/';
  public currentNauId: number = 0;
  public currentNau!: Nau;
  public pageNum: number = 1;

  //* MÈTODES
  public getImgSrc(): string {
    return this.imgsUrl;
  }

  //* retornar resultats d la pag X del llistat de naus de la SWAPI
  public getNausPerPage(x: number) {
    const params = new HttpParams().set('page', x);
    return this.http.get<Nau[]>(`${this.nausUrl}`, { params });
  }
}
