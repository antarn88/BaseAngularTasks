import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { User } from 'src/app/core/models/user/user.model';
import { CoreService } from 'src/app/core/services/core/core.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  users: User[] = [];
  $destroy: Subject<void> = new Subject<void>();

  constructor(private coreService: CoreService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // TODO: Implement this method
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  fetchUsers(): void {
    this.coreService
      .getUsers()
      .pipe(takeUntil(this.$destroy))
      .subscribe((users: User[]) => {
        this.users = users;
        // console.log(users);
      });
  }
}
