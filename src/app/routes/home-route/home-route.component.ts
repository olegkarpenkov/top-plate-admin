import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { AccessPointService } from '../../services/access-point.service';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.scss']
})
export class HomeRouteComponent implements OnInit {

  public generalData: any;

  public editMode: Boolean = false;

  public onSave: Boolean = false;

  public toggleEditMode () {
    let self = this;
    self.editMode = !self.editMode;
  }

  public saveChanges () {
    let
      self = this,
      fieldsToUpdate = {};

    self.editMode = false;
    self.onSave = true;

    ['address', 'description', 'email', 'phone'].forEach(key => fieldsToUpdate[key] = self.generalData[key]);

    self.accessPointService.postRequest('update-general-data', fieldsToUpdate)
      .subscribe(
        onSuccess => {
          self.editMode = false;
          self.onSave = false;
          console.log('saved');
        },
        err => self.accessPointService.handleHttpError(err)
      );
  }

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accessPointService: AccessPointService
  ) {}

  ngOnInit () {
    let
      self = this,
      routeData = self.activatedRoute.snapshot.data;

    self.generalData = routeData['generalData'];
  }
}
