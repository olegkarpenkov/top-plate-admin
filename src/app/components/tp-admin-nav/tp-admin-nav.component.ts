import { Component, Input, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { pairwise } from 'rxjs/operators';
import { timer} from 'rxjs';

@Component({
  selector: 'app-tp-admin-nav',
  templateUrl: './tp-admin-nav.component.html',
  styleUrls: ['./tp-admin-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TpAdminNavComponent implements OnInit {

  public links: any[] = [
    {
      name: '/home',
      label: 'general',
      link: 'home',
      isSelected: false
    },
    {
      name: '/users',
      label: 'users',
      link: 'users',
      isSelected: false
    },
    {
      name: '/plates',
      label: 'plates',
      link: 'plates',
      isSelected: false
    }
  ];

  public onLinkClick (link) {
    let self = this;
    self.router.navigate([link.link]);
  }

  private markAsSelected (rootName) {
    let self = this;
    self.links.forEach(link => link.isSelected = link.name === rootName);
  }

  public get selectedLink () {
    let
      self = this,
      selectedLink = self.links.filter(link => link.isSelecred)[0];

    return (selectedLink && selectedLink.name) || null;
  }

  constructor (
    private router: Router
  ) {}

  ngOnInit () {
    let self = this;
    self.router.events.subscribe(event => event instanceof NavigationEnd && self.markAsSelected(event.url));
  }
}
