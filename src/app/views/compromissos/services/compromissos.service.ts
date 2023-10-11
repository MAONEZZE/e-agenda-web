import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { FormCompromissoViewModel } from "../models/forms-compromisso.view-model";
import { ListarCompromissoViewModel } from "../models/listar-compromisso.view-model";

@Injectable()

export class CompromissoService{
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/compromissos/'

  constructor(private http: HttpClient){}

  public inserir(compromisso: any): Observable<FormCompromissoViewModel>{
    return this.http.post<any>(this.endpoint, compromisso, this.obterHeadersAutorizacao());
  }

  public editar(id: string, compromisso: FormCompromissoViewModel): Observable<FormCompromissoViewModel>{
    return this.http.put<any>(this.endpoint + id, compromisso, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados)
      );
  }

  public excluir(id: string): Observable<any>{
    return this.http.delete(this.endpoint + id, this.obterHeadersAutorizacao());
  }

  private obterHeadersAutorizacao() {
    const token = environment.apiKey;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]>{
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados)
      );
  }

  public selecionarPorId(id: string): Observable<FormCompromissoViewModel>{
    return this.http
    .get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
    .pipe(
      map((res) => res.dados)
    );
  }

  public selecionarCompromissoCompletoPorId(id: string){
    return this.http
    .get<any>(this.endpoint + 'visualizacao-completa/' + id, this.obterHeadersAutorizacao())
    .pipe(
      map((res) => res.dados)
    );
  }
}