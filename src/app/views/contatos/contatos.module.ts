import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InserirContatoComponent } from './inserir-contato/inserir-contato.component';
import { ContatosService } from './services/contatos.service';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './excluir-contato/excluir-contato.component';
import { CardComponent } from './card/card.component';
import { ContatosRoutingModule } from './contatos-routing.module';

import 'src/app/extensions/form-group.extensions'

@NgModule({
  declarations: [InserirContatoComponent, ListarContatosComponent, EditarContatoComponent, ExcluirContatoComponent, CardComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ContatosRoutingModule],
  providers: [ContatosService] 
  //nos modulos declara components e registra serviços
})
export class ContatosModule { }
