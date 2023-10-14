import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { CategoriaService } from '../services/categorias.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit{
  form!: FormGroup;
  categoriaVM!: FormsCategoriaViewModel;

  constructor(
    private formBuilder: FormBuilder, 
    private categoriaService: CategoriaService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private toastService: ToastrService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
    });

    this.categoriaVM = this.route.snapshot.data['categoria'];

    this.form.patchValue(this.categoriaVM);
  }

  gravar(){
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.toastService.error(item);
      }

      return;
    }
    
    this.categoriaVM = this.form.value;
    
    this.categoriaService.inserir(this.categoriaVM).subscribe({
      next: (contato: FormsCategoriaViewModel) => this.processarSucesso(contato),
      error: (error: Error) => this.processarFalha(error),
    });
    
  }

  processarSucesso(categoria: FormsCategoriaViewModel){
    this.toastService.success(`A categoria ${categoria.titulo} foi cadastrado com sucesso!`, 'Sucesso');
    this.router.navigate(['/categorias/listar']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }

}
