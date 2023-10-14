import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from "rxjs";

import { ListarContatoViewModel } from "../models/listar-contato.view-model";
import { environment } from "src/environments/environment";
import { FormsContatoViewModel } from "../models/forms-contato.view-model";

@Injectable()

export class ContatosService{
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/contatos/'

  constructor(private http: HttpClient){}

  private processarErroHttp(error: HttpErrorResponse){
    let msgErro = '';

    if(error.status == 401){
      msgErro = 'O usuário não está autorizado. Faça o o login e tente novamente.'
    }
    else if(error.status == 0){
      msgErro = 'Ocorreu um erro ao processar a requisição.'
    }
    else{
      msgErro = error.error?.erros[0]
    }
    return throwError(() => new Error(msgErro))
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

  public inserir(contato: any): Observable<FormsContatoViewModel>{
    return this.http
      .post<any>(this.endpoint, contato, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public editar(id: string, contato: FormsContatoViewModel){
    return this.http.put<any>(this.endpoint + id, contato, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public excluir(id: string): Observable<any>{
    return this.http.delete(this.endpoint + id, this.obterHeadersAutorizacao())
      .pipe(
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]>{
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public selecionarPorId(id: string): Observable<FormsContatoViewModel>{
    return this.http
    .get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarContatoCompletoPorId(id: string){
    return this.http
    .get<any>(this.endpoint + 'visualizacao-completa/' + id, this.obterHeadersAutorizacao())
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }
}