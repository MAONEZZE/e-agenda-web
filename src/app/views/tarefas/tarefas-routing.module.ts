import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { ExcluirTarefaComponent } from './excluir-tarefa/excluir-tarefa.component';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { ListarTarefaViewModel } from './models/listar-tarefas.view-model';
import { TarefaService } from './services/tarefas.service';
import { FormsDespesaViewModel } from '../despesas/models/forms-despesa.view-model';
import { VisualizarDespesaViewModel } from '../despesas/models/visualizar-despesa.view-model';
import { DespesaService } from '../despesas/services/despesas.service';
import { FormsTarefaViewModel } from './models/forms-tarefa.view-model';

const listarTarefasResolver: ResolveFn<ListarTarefaViewModel[]> = () => {
  return inject(TarefaService).selecionarTodos();
}

const formsTarefaResolver: ResolveFn<FormsTarefaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(TarefaService).selecionarPorId(route.paramMap.get('id')!)
}

const visualizarTarefaResolver: ResolveFn<VisualizarDespesaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(TarefaService).selecionarDespesaCompletaPorId(route.paramMap.get('id')!)
}

const routes : Routes =[
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarTarefasComponent,
    resolve: { 'tarefas': listarTarefasResolver}
  },
  {
    path: 'editar/:id',
    component: EditarTarefaComponent,
    resolve: { 'tarefa': formsTarefaResolver}
  },
  {
    path: 'excluir/:id',
    component: ExcluirTarefaComponent
  },
  {
    path: 'inserir',
    component: InserirTarefaComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarefasRoutingModule { }
