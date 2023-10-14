import { Component, OnInit } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit{
  contatos: ListarContatoViewModel[] = [];

  constructor(private route: ActivatedRoute, private toastService: ToastrService){}

  ngOnInit(): void {
    this.route.data.pipe(map(dados => dados['contatos'] )).subscribe({
      next: (contatos) => this.processarSucesso(contatos),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(contatos: ListarContatoViewModel[]){
    this.contatos = contatos;
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error')
  }
}
