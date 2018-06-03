import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  type: string = '';
  value: string = '';
  result: string = '';
  url: string = 'https://backend.fitpass.mx/api/v3/registered?';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }

  onSubmit() {

    if (!this.type) {
      this.result = 'Please, choose a type of validation in order to use this tool.';
    } else if (!this.value) {
      this.result = 'Please, add a value in order to check availability.';
    } else {
      if (this.type === 'email' && this.value.indexOf('@') === -1) {
        this.result = 'Please, provide a proper email to verify.';
      } else if (this.type === 'phone' && isNaN(parseInt(this.value))) {
        this.result = 'Please, provide a proper phone number to verify.';
      } else {
        this.http.get(this.url + this.type + '=' + this.value).subscribe(data => {
          const d:any = data;

          if (!d.registered) {
            this.result = `The ${this.type} '${this.value}' can be used for registration. 😃`
          } else if (d.registered) {
            this.result = `The ${this.type} '${this.value}' has been already registered. Please use another one. 😔`
          }

        });

      }
      
    }
    
    return false;
  }

  onReset() {
    this.type = '';
    this.value = '';
    this.result = '';

    return false;
  }
}
