import { Inject, NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InserirContatoComponent } from './views/contatos/inserir-contato/inserir-contato.component';
import { ListarContatosComponent } from './views/contatos/listar-contatos/listar-contatos.component';
import { EditarContatoComponent } from './views/contatos/editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './views/contatos/excluir-contato/excluir-contato.component';
import { InserirCompromissoComponent } from './views/compromissos/inserir-compromisso/inserir-compromisso.component';
import { EditarCompromissoComponent } from './views/compromissos/editar-compromisso/editar-compromisso.component';
import { ExcluirCompromissoComponent } from './views/compromissos/excluir-compromisso/excluir-compromisso.component';
import { ListarCompromissosComponent } from './views/compromissos/listar-compromissos/listar-compromissos.component';
import { FormsContatoViewModel } from './views/contatos/models/forms-contato.view-model';
import { ContatosService } from './views/contatos/services/contatos.service';
import { VisualizarContatoViewModel } from './views/contatos/models/visualizar-contato.view-model';
import { ListarContatoViewModel } from './views/contatos/models/listar-contato.view-model';

const routes: Routes = [
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'contatos', //As rotas que tiverem essa palavra na rota, serão direcionadas pra cá
    loadChildren: () => import('./views/contatos/contatos.module').then((modulo) => modulo.ContatosModule)
    //Aqui ele vai importar o modulo e usar as respectivas rotas do modulo
  },
  {
    path:'compromissos',
    loadChildren: () => import('./views/compromissos/compromissos.module').then((modulo) => modulo.CompromissosModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./views/categoria/categoria.module').then((modulo) => modulo.CategoriaModule)
  },
  {
    path: 'despesas',
    loadChildren: () => import('./views/despesas/despesas.module').then((modulo) => modulo.DespesasModule)
  },
  {
    path: 'tarefas',
    loadChildren: () => import('./views/tarefas/tarefas.module').then((modulo) => modulo.TarefasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
