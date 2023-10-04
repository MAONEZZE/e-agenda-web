import { Component, Input } from '@angular/core';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ListarFormsContatoViewModel } from '../models/listar-contato.view-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() contato: ListarFormsContatoViewModel;

  constructor(){
    this.contato = new ListarFormsContatoViewModel('','','','','')
  }
}
