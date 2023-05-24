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

  selectedRabbiValue = '';
  rabbies: { name: string; value: string }[] = [
    { name: 'Mózes Sofer', value: 'chatam_sofer' },
    { name: 'Yitzchok Hutner', value: 'rav_hutner' },
    { name: 'Immanuel Löw', value: 'low_immanuel' },
    { name: 'Izsák Lőw', value: 'low_izsak' },
    { name: 'Samuel Kohn', value: 'kohn_samuel' },
    { name: 'Köves Slomó', value: 'koves_slomo' },
    { name: 'Oberlander rabbi', value: 'oberlander_rabbi' },
    { name: 'Megyeri Jonatán', value: 'megyeri_jonatan' },
    { name: 'Frölich rabbi', value: 'frolich_rabbi' },
  ];

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

  onChangeRabbi(event: Event): void {
    const target = event.target as HTMLInputElement;
    const name = this.rabbies.find((rabbi) => rabbi.value === target.value)?.name;
    console.log('Kijelölt rabbi neve:', name || '');
    // console.log('Rabbi azonosító:', target.value);
  }
}
