import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-contact',
  template: `
    <div class="flex justify-content-center">
      <p-card header="Contact" class="w-6">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="field mb-4">
            <label for="email" class="block mb-2">Email</label>
            <input id="email" type="email" pInputText formControlName="email" class="w-full">
            @if (form.get('email')?.invalid && form.get('email')?.touched) {
              <small class="p-error block">Email invalide</small>
            }
          </div>
          
          <div class="field mb-4">
            <label for="message" class="block mb-2">Message</label>
            <textarea id="message" pInputTextarea formControlName="message" 
                      [rows]="5" class="w-full"></textarea>
            @if (form.get('message')?.invalid && form.get('message')?.touched) {
              <small class="p-error block">
                Le message est requis et doit faire moins de 300 caractères
              </small>
            }
          </div>

          <div class="flex justify-content-end">
            <p-button type="submit" label="Envoyer" [disabled]="form.invalid"></p-button>
          </div>
        </form>
      </p-card>
    </div>
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule
  ]
})
export class ContactComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Here you would typically send the form data to a backend service
      console.log(this.form.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Demande de contact envoyée avec succès'
      });
      this.form.reset();
    }
  }
}