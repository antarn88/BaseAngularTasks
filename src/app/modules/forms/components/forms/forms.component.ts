import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  typedForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    age: new FormControl<number | null>(null, Validators.required),
  });

  typedFormV2 = this.fb.group({
    name: this.fb.nonNullable.control('', Validators.required),
    email: this.fb.nonNullable.control('', Validators.required),
    age: this.fb.control<number | null>(null, Validators.required),
  });

  ngOnInit(): void {
    console.log('formok komponens betöltve');
    console.log('form értékei alapból:', this.typedForm.value);
    this.typedForm.controls.age.setValue(40);
    console.log('érték beállítás után:', this.typedForm.value);
    setTimeout(() => {
      this.typedForm.reset();
      console.log('form értékei reset után:', this.typedForm.value);
    }, 5000);
  }
}
