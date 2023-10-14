import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveData, ResolveFn, RouterModule, Routes } from '@angular/router';

import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';
import { FormCompromissoViewModel } from './models/forms-compromisso.view-model';
import { CompromissoService } from './services/compromissos.service';
import { VisualizarCompromissoViewModel } from './models/visualizar-compromisso.view-model';
import { ListarCompromissoViewModel } from './models/listar-compromisso.view-model';

const listarCompromissosResolver: ResolveFn<ListarCompromissoViewModel[]> = () => {
  return inject(CompromissoService).selecionarTodos();
};

const formsCompromissoResolver: ResolveFn<FormCompromissoViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(CompromissoService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarCompromissoResolver: ResolveFn<VisualizarCompromissoViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(CompromissoService).selecionarCompromissoCompletoPorId(route.paramMap.get('id')!);
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarCompromissosComponent,
    resolve: { compromissos: listarCompromissosResolver}
  },
  {
    path: 'editar/:id',
    component: EditarCompromissoComponent,
    resolve: { compromisso: formsCompromissoResolver}
  },
  {
    path:'excluir/:id',
    component: ExcluirCompromissoComponent,
    resolve: { compromisso: visualizarCompromissoResolver}
  },
  {
    path: 'inserir',
    component: InserirCompromissoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompromissosRoutingModule {}
