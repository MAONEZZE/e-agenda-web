import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';
import { CardComponent } from './card/card.component';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { CompromissoService } from './services/compromissos.service';
import { CompromissosRoutingModule } from './compromissos-routing.module';
import { ContatosService } from '../contatos/services/contatos.service';

import 'src/app/extensions/form-group.extensions'

@NgModule({
  declarations: [InserirCompromissoComponent, EditarCompromissoComponent, ExcluirCompromissoComponent, CardComponent, ListarCompromissosComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CompromissosRoutingModule, NgbModule, NgSelectModule],
  providers: [CompromissoService, ContatosService] //Aqui declara os serviços que irá usar
})
export class CompromissosModule { }
