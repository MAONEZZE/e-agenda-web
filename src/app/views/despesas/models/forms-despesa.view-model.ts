import { FormaPagamentoEnum } from "./forma-pagamento.enum";

export type FormsDespesaViewModel = {
  descricao: string;
  valor: number;
  formaPagamento: FormaPagamentoEnum;
  categoriasSelecionadas: string[];
}