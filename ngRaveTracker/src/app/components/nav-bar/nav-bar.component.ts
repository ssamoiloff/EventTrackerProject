import { Component, OnInit, Query } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  query = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeSearch(searchQuery) {
    this.router.navigateByUrl(`/search/${searchQuery}`);
  }
}
