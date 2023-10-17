import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { ExcluirTarefaComponent } from './excluir-tarefa/excluir-tarefa.component';
import { CardComponent } from './card/card.component';

import 'src/app/extensions/form-group.extensions'
import { TarefaService } from './services/tarefas.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TarefasRoutingModule } from './tarefas-routing.module';

@NgModule({
  declarations: [InserirTarefaComponent, ListarTarefasComponent, EditarTarefaComponent, ExcluirTarefaComponent, CardComponent],
  imports: [CommonModule, ReactiveFormsModule, TarefasRoutingModule, RouterModule, NgSelectModule, NgbTooltipModule],
  providers: [TarefaService]
})
export class TarefasModule { }
