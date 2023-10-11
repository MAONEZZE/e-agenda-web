import { Component, OnInit } from '@angular/core';
import { CompromissoService } from '../services/compromissos.service';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit{
  compromissos: ListarCompromissoViewModel[] = [];

  constructor(private compromissoService: CompromissoService){}

  ngOnInit(): void {
    this.compromissoService.selecionarTodos().subscribe((res) => {
      console.log(res)
      this.compromissos = res;
    })
  }

}
