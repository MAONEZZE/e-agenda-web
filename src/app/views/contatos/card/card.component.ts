import { Component, Input } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() contato: ListarContatoViewModel;

  constructor(){
    this.contato = new ListarContatoViewModel('','','','','')
  }
}
