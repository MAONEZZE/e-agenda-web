import { Component, Input } from '@angular/core';
import { ListarTarefaViewModel } from '../models/listar-tarefas.view-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() tarefa!: ListarTarefaViewModel;
}
