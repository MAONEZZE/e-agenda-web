import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InserirContatoComponent } from './inserir-contato/inserir-contato.component';
import { ContatosService } from './services/contatos.service';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { RouterModule } from '@angular/router';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './excluir-contato/excluir-contato.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [InserirContatoComponent, ListarContatosComponent, EditarContatoComponent, ExcluirContatoComponent, CardComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [ContatosService] 
  //nos modulos declara components e registra serviços
})
export class ContatosModule { }
