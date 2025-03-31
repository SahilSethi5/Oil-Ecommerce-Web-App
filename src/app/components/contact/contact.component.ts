// contact.component.ts (continued)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      // In a real app, you would send this to your backend API
      console.log('Form submitted:', this.contactForm.value);
      
      // Reset form and show success message
      this.contactForm.reset();
      setTimeout(() => {
        this.submitted = false;
      }, 5000);
    }
  }
} 