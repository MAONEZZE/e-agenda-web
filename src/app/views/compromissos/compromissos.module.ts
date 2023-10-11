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



@NgModule({
  declarations: [InserirCompromissoComponent, EditarCompromissoComponent, ExcluirCompromissoComponent, CardComponent, ListarCompromissosComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [CompromissoService] //Aqui declara os serviços que irá usar
})
export class CompromissosModule { }
