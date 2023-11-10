import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import 'src/app/extensions/form-group.extensions'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [RegistroComponent],
  imports: [CommonModule, ReactiveFormsModule, RegistroRoutingModule, RouterModule, NgSelectModule, MatButtonModule, MatIconModule],
})
export class RegistroModule { }
