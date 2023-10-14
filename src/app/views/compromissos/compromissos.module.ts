import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';
import { CardComponent } from './card/card.component';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { CompromissoService } from './services/compromissos.service';
import { CompromissosRoutingModule } from './compromissos-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContatosModule } from '../contatos/contatos.module';



@NgModule({
  declarations: [InserirCompromissoComponent, EditarCompromissoComponent, ExcluirCompromissoComponent, CardComponent, ListarCompromissosComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CompromissosRoutingModule, NgbModule, ContatosModule],
  providers: [CompromissoService] //Aqui declara os serviços que irá usar
})
export class CompromissosModule { }
