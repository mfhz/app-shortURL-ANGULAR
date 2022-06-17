import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.scss']
})
export class ShortUrlComponent implements OnInit {
  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: Boolean;
  textError: string;

  constructor(private _shortUrlService: ShortUrlService) { 
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
  }

  ngOnInit(): void {
  }

  //Validar si la URL es vacía

  procesarURL() {
    // console.log(this.nombreUrl);
    if (this.nombreUrl === '') {
      this.error('Por favor ingrese una URL');
      return;
    } 
    this.urlProcesada = false;
    this.loading = true;

    setTimeout(() => {
      this.obtenerUrlShort();
    }, 2000);

    
  }

  obtenerUrlShort() {
      this._shortUrlService.getUrlShort(this.nombreUrl).subscribe(data => {
      // console.log(data.link);
      this.loading = false;
      this.urlShort = data.link;
      this.urlProcesada = true;
    }, err => {
      console.log(err);
      this.loading = false;
      this.nombreUrl = '';
      if (err.error.description.toUpperCase() === 'THE VALUE PROVIDED IS INVALID.') {
        this.error('La URL ingresada es invalida');
      }
      
    });
  }

  error(valor: string) {
      this.mostrarError = true;
      this.textError = valor;
      setTimeout(() => {
        this.mostrarError = false;
      }, 4000);
  }

}
