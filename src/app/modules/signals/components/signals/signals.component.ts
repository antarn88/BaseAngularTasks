import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { User } from 'src/app/core/models/user/user.model';
import { CoreService } from 'src/app/core/services/core/core.service';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss'],
})
export class SignalsComponent implements OnInit {
  usersSignal = signal<User[]>([]);
  destroyRef = inject(DestroyRef);
  names = computed(() => this.usersSignal().map((user: User) => user.name));

  constructor(private coreService: CoreService) {
    // effect(() => this.watchUsersChanges());
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  // watchUsersChanges(): void {
  //   console.log('watchUsersChanges');
  //   if (this.usersSignal().length) {
  //     console.log('usersSignal:', this.usersSignal());
  //   }
  // }

  fetchUsers(): void {
    this.coreService
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((users: User[]) => {
        this.usersSignal.set(users);
        console.log('Változott a usersSignal értéke:', this.usersSignal());
        console.log('Változott a names értéke:', this.names());
      });
  }
}
