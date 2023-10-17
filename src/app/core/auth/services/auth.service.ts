import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { TokenViewModel } from "../models/token.view-model";
import { RegistrarUserViewModel } from "../models/registrar-usuario.view-model";
import { LocalStorageService } from "./local-storage.service";
import { AutenticarUserViewModel } from "../models/autenticar-user.view-model";

@Injectable()

export class AuthService{
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/'

  private endpointRegistrar: string = this.endpoint + 'registrar';
  private endpointLogin: string = this.endpoint + 'autenticar';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService){}

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

  public registrar(user: RegistrarUserViewModel): Observable<TokenViewModel>{
    return this.http.post<any>(this.endpointRegistrar, user)
      .pipe(
        //Mapeia a resposta completa para retornar apenas os dados
        map((res) => res.dados),

        //Obtem o retorno do map e salvar no local-storage
        tap((dados: TokenViewModel) => this.localStorageService.salvarDadosLocaisUser(dados)),
        
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public login(user: AutenticarUserViewModel): Observable<TokenViewModel>{
    return this.http.post<any>(this.endpointLogin, user)
      .pipe(
        //Mapeia a resposta completa para retornar apenas os dados
        map((res) => res.dados),

        //Obtem o retorno do map e salvar no local-storage
        tap((dados: TokenViewModel) => this.localStorageService.salvarDadosLocaisUser(dados)),
        
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }
}