import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TpGridComponent } from './tp-grid/tp-grid.component';
import { D3Service } from 'd3-ng2-service';
import { TpAdminNavComponent } from './tp-admin-nav/tp-admin-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TpGridComponent,
    TpAdminNavComponent
  ],
  providers: [
    D3Service
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    TpGridComponent,
    TpAdminNavComponent
  ]
})

export class AppCommonModule {}
