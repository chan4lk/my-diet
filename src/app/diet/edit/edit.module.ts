import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';
import { ComponentModule } from 'src/app/components/components.module';
import { KiloFormaterPipe } from 'src/app/components/number-pipe/number.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentModule,
    EditPageRoutingModule,
  ],
  providers: [KiloFormaterPipe],
  declarations: [EditPage],
})
export class EditPageModule {}
