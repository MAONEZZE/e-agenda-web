import { Component, OnInit } from '@angular/core';
import { ListarTarefaViewModel } from '../models/listar-tarefas.view-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefaService } from '../services/tarefas.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: './listar-tarefas.component.html',
  styleUrls: ['./listar-tarefas.component.css']
})
export class ListarTarefasComponent implements OnInit{
  tarefas: ListarTarefaViewModel[] = [];

  constructor(
    private toastService: ToastrService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.route.data.pipe(map(dados => dados['tarefas'] )).subscribe({
      next: (tarefas) => this.processarSucesso(tarefas),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(tarefas: ListarTarefaViewModel[]){
    this.tarefas = tarefas;
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error')
  }
}
