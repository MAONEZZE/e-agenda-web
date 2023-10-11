import { ListarFormsContatoViewModel } from "../../contatos/models/listar-contato.view-model";

export class VisualizarCompromissoViewModel{
  id: string;
  assunto: string;
  local: string;
  tipoLocal: 0;
  link: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contato: ListarFormsContatoViewModel;

  constructor(
    id: string, 
    assunto: string, 
    local: string, 
    tipoLocal: 0, 
    link: string, 
    data: Date, 
    horaInicio: string, 
    horaTermino: string, 
    contato: ListarFormsContatoViewModel
    ){
    this.id = id;
    this.assunto = assunto;
    this.local = local;    
    this.tipoLocal = tipoLocal;
    this.link = link;      
    this.data = data;      
    this.horaInicio = horaInicio;
    this.horaTermino = horaTermino;
    this.contato = contato;
  }
}