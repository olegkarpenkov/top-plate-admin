import { Component, Input, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { TpGridModel } from './tp-grid.model';
import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
  selector: 'app-tp-grid',
  templateUrl: './tp-grid.component.html',
  styleUrls: ['./tp-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TpGridComponent implements OnInit {

  @Input() public model: TpGridModel;

  private d3: D3;

  private root: Selection<any, any, any, any>;

  private refreshDOM () {
    let
      self = this,
      d3 = self.d3 = self.d3Service.getD3();
    self.root = d3.select(self.ref.nativeElement).classed('tp-grid', true);
  }

  public onColumnClick (col) {
    let
      self = this,
      model = self.model;

    if (col.isSortable) {
      if (col.isSelected) model.toggleColumnReversed(col.name);
      else model.toggleColumnSelected(col.name);
    } else model.toggleColumnSelected(col.name);
  }

  public onRowClick (row) {}

  constructor (
    private ref: ElementRef,
    private d3Service: D3Service
  ) {}

  ngOnInit () {
    let self = this;
    self.refreshDOM();
    self.model.emitEvent('onReady', self.model);
  }
}

