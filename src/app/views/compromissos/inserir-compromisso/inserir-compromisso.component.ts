import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ContatosService } from '../../contatos/services/contatos.service';
import { FormCompromissoViewModel } from '../models/forms-compromisso.view-model';
import { CompromissoService } from '../services/compromissos.service';
import { ListarFormsContatoViewModel } from '../../contatos/models/listar-contato.view-model';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styleUrls: ['./inserir-compromisso.component.css']
})
export class InserirCompromissoComponent implements OnInit{
  form!: FormGroup;
  contatos: ListarFormsContatoViewModel[] = [];
  compromissoVM!: FormCompromissoViewModel;
  
  constructor(private contatoService: ContatosService, private formBuilder: FormBuilder, private compromissoService: CompromissoService, private router: Router, private toastService: ToastrService){}
  
  ngOnInit(): void {
    this.carregarContatos();

    this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      tipoLocal: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      contatoId: new FormControl('', [Validators.required]),
    });
  }

  carregarContatos(){
    this.contatoService.selecionarTodos().subscribe((res) => {
      this.contatos = res;
    });
  }
 
  campoEstaInvalido(campo: string): boolean{
    const estaInvalido: boolean = !this.form.get(campo)!.pristine && this.form.get(campo)!.invalid;

    return estaInvalido;
  }

  gravar(){
    if(this.form.invalid){
      const camposParaValidar = [
        { campo: 'assunto', mensagem: '* O assunto é obrigatório'},
        { campo: 'local', mensagem: '* O local é obrigatório'},
        { campo: 'tipoLocal', mensagem: '* O tipo do local é obrigatório'},
        { campo: 'link', mensagem: '* O link é obrigatório'},
        { campo: 'data', mensagem: '* A data é obrigatório'},
        { campo: 'horaInicio', mensagem: '* O horário inicial é obrigatório'},
        { campo: 'horaTermino', mensagem: '* O horário de termino é obrigatório'},
        { campo: 'contatoId', mensagem: '* O campo da empresa é obrigatório'},
      ]

      const erros: string[] = [];

      for(let item of camposParaValidar){
        if(this.form.get(item.campo)?.invalid){
          erros.push(item.mensagem);
        }
      }

      for(let item of erros){
        this.toastService.error(item, 'Erro no envio do Formulário');
      }

      return;
    }

    this.compromissoVM = this.form.value;

    this.compromissoService.inserir(this.compromissoVM).subscribe((res) => {
      this.router.navigate(['/compromissos', 'listar'])
    });
  }
}
