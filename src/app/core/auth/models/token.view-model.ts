import { UsuarioTokenViewModel } from "./usuario-token.view-model";

export type TokenViewModel = {
  chave: string;
  dataExpiracao: Date;
  userToken: UsuarioTokenViewModel;
}