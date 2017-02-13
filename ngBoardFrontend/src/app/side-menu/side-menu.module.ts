import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BoardModule } from './../board/board.module';
import { SharedModule } from './../shared/shared.module';
import { LoginModule } from '../login/login.module';

import { SideMenuComponent } from './side-menu.component';

@NgModule({
  declarations: [
    SideMenuComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    SharedModule,
    BoardModule,
    LoginModule
  ],
  exports: [
    SideMenuComponent
  ]
})
export class SideMenuModule { }
