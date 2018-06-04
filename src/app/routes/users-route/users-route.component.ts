import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { AccessPointService } from '../../services/access-point.service';
import { TpGridModel } from '../../components/tp-grid/tp-grid.model';
import {BehaviorSubject} from 'rxjs';
import {select} from 'd3-selection';

@Component({
  selector: 'app-users-route',
  templateUrl: './users-route.component.html',
  styleUrls: ['./users-route.component.scss']
})
export class UsersRouteComponent implements OnInit {

  private core: BehaviorSubject<any>;

  public gridModel: TpGridModel;

  public statusFilter: any[] = [
    {
      name: 'all',
      label: 'ALL',
      isSelected: false
    },
    {
      name: 'active',
      label: 'ACTIVE ONLY',
      isSelected: false
    },
    {
      name: 'suspended',
      label: 'SUSPENDED ONLY',
      isSelected: false
    }
  ];

  public toggleStatusFilter (name, applyChanges = false) {
    let self = this;
    self.statusFilter.forEach(f => f.isSelected = f.name === name);
    if (applyChanges) self.loadData();
  }

  public getStatusFilter () {
    let self = this;
    return self.statusFilter.filter(f => f.isSelected)[0];
  }

  private loadData () {
    let
      self = this,
      selectedColumn = self.gridModel.selectedColumn,
      selectedColumnName = selectedColumn.name,
      selectedColumnDirection = selectedColumn.isReversed,
      statusFilter = self.getStatusFilter.name;

    self.accessPointService.getRequest('/get-users-data', {
      sortBy: selectedColumnName,
      reversed: selectedColumnDirection,
      useFilter: statusFilter
    })
      .subscribe(
        usersData => {
          self.gridModel['refreshRows'](usersData);
        },
        err => self.accessPointService.handleHttpError(err)
      );
  }

  private loadGridSettings () {
    let
      self = this,
      column = localStorage.getItem('usersGridColumn'),
      filter = localStorage.getItem('usersGridFilter');

    return column && filter ? {
      column: localStorage.getItem('usersGridColumn'),
      filter: localStorage.getItem('usersGridFilter')
    } : null;
  }

  private saveGridSettings (column, isReversed, filter) {
    let self = this;
    localStorage.setItem('usersGridColumn', column);
    localStorage.setItem('usersGridColumnReversed', isReversed);
    localStorage.setItem('usersGridFilter', filter);
  }

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accessPointService: AccessPointService
  ) {}

  ngOnInit () {
    let self = this;

    self.gridModel = new TpGridModel([
      {
        name: 'name',
        label: 'Username',
        type: 'string',
        sortable: true
      },
      {
        name: 'provider',
        label: 'Last user provider',
        type: 'string',
        sortable: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'string',
        sortable: true
      },
      {
        name: 'likedPlates',
        label: 'Liked plates',
        type: 'list'
      },
      {
        name: 'uploadedPlates',
        label: 'Uploaded plates',
        type: 'list'
      },
      {
        name: 'isActive',
        label: 'isActive',
        type: 'color',
        colorSet: {
          isActive: '#0f0',
          isSuspended: '#f00',
          default: '#00f'
        }
      }
    ],
    {
      onReady: () => {
        let savedGridSettings = self.loadGridSettings();
        if (savedGridSettings) {
          self.gridModel.toggleColumnSelected('name');
          self.toggleStatusFilter('all');
          self.saveGridSettings(
            self.gridModel.selectedColumn.name,
            self.gridModel.selectedColumn.isReversed,
            self.getStatusFilter().name
          );
        } else {
          self.gridModel.toggleColumnSelected(savedGridSettings.column);
          self.toggleStatusFilter(savedGridSettings.filter);
        }
        self.loadData();
      }
    });
  }
}
