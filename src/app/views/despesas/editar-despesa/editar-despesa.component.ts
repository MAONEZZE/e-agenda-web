import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsDespesaViewModel } from '../models/forms-despesa.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { DespesaService } from '../services/despesas.service';
import { ToastrService } from 'ngx-toastr';
import { ListarCategoriaViewModel } from '../../categoria/models/listar-categoria.view-model';
import { CategoriaService } from '../../categoria/services/categorias.service';

@Component({
  selector: 'app-editar-despesa',
  templateUrl: './editar-despesa.component.html',
  styleUrls: ['./editar-despesa.component.css']
})
export class EditarDespesaComponent implements OnInit{
  form!: FormGroup;
  despesaVM!: FormsDespesaViewModel;
  categorias: ListarCategoriaViewModel[] = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private despesaService: DespesaService,
    private toastService: ToastrService,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder
  ){}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao: new FormControl('', [Validators.required, Validators.minLength(3)]),
      valor: new FormControl('', [Validators.required, Validators.min(0.1)]),
      data: new FormControl(new Date().toString().substring(0, 10), Validators.required),
      formaPagamento: new FormControl(0, [Validators.required]),
      categoriasSelecionadas: new FormControl([], [Validators.required]),
    });

    this.despesaVM = this.route.snapshot.data['despesa'];

    this.categoriaService.selecionarTodos().subscribe((res) => {
      this.categorias = res;
    });
  }

  gravar(){
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.toastService.error(item)
      }

      return; 
    }

    this.despesaVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id')!;

    this.despesaService.editar(id, this.despesaVM).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    })
  }

  processarSucesso(){
    this.toastService.success(`A despesa foi editada com sucesso!`, 'Sucesso');
    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
