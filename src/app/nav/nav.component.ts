import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.router.navigate(['nav'])
   
  }

}
