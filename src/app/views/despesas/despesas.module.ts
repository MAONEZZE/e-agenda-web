import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { ExcluirDespesaComponent } from './excluir-despesa/excluir-despesa.component';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { CardComponent } from './card/card.component';
import { DespesaService } from './services/despesas.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DespesasRoutingModule } from './despesas-routing.module';
import { RouterModule } from '@angular/router';

import 'src/app/extensions/form-group.extensions'

@NgModule({
  declarations: [ListarDespesasComponent, ExcluirDespesaComponent, EditarDespesaComponent, InserirDespesaComponent, CardComponent],
  imports: [CommonModule, ReactiveFormsModule, DespesasRoutingModule, RouterModule],
  providers: [DespesaService]
})
export class DespesasModule { }
