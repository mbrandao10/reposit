import { Component, OnChanges, OnInit, Input, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';
import { FormControl, Validators, AbstractControl, FormGroup } from '@angular/forms';

export interface AutocompleteOptions {
  id: string; // Campo del array que va a servir de ID
  name: string; // Campo del array en el que se va a buscar
  numberElements?: number; // Numero de elementos que se van a mostrar (por defecto son 10)
  required?: boolean;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})

export class AutocompleteComponent implements OnInit, OnChanges {

  constructor(
    myElement: ElementRef) {
    this.createForm();
    this.elementRef = myElement;
  }
  @Input() items: any[];
  @Input() autocompleteOptions: AutocompleteOptions;
  @Output() valueSelected = new EventEmitter();

  frmCntrlAcutocomplete: FormGroup;

  itemsFiltereds: any[];
  elementRef: any;

  @HostListener('document:click', ['$event']) onClick($event) {this.handleClick($event); }

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges() {
    // Si se modifica el campo name evaluamos los cambios
    this.frmCntrlAcutocomplete.get('name').valueChanges.subscribe(val => {
      console.log('Se ha cambiado el formControl a: ' + val);
      this.filter();
    });
  }

  createForm() {
    this.frmCntrlAcutocomplete = new FormGroup({
      id: new FormControl(null, Validators.compose([this.formCustomValidatorId()])),
      name: new FormControl(null, Validators.compose([this.formCustomValidatorName()]))
    });
  }

  filter() {
    let item: any = {};
    if (this.frmCntrlAcutocomplete.get('name').value) {
      let list: any = [];
      list = this.items.filter(function (elem: any) {
        return elem[this.autocompleteOptions.name].toLowerCase().indexOf(this.frmCntrlAcutocomplete.get('name').value.toLowerCase()) > -1;
      }.bind(this));
      if (list.length === 1 &&
        list[0][this.autocompleteOptions.name].toLowerCase() === this.frmCntrlAcutocomplete.get('name').value.toLowerCase()) {
        this.itemsFiltereds = [];
        item = list[0];
        this.setId(item[this.autocompleteOptions.id]);
      } else {
        this.itemsFiltereds =
          list.slice(0, (this.autocompleteOptions.numberElements ? this.autocompleteOptions.numberElements : 10));
      }
    } else {
      this.itemsFiltereds = [];
    }
    this.valueSelected.emit({
      frmCntrlAcutocomplete: this.frmCntrlAcutocomplete,
      itemSelected: item
    });
  }

  select(item: any) {
    this.setId(item[this.autocompleteOptions.id]);
    this.setName(item[this.autocompleteOptions.name]);
    this.itemsFiltereds = [];
  }

  setId(value: any) {
    this.frmCntrlAcutocomplete.get('id').setValue(value);
  }

  setName(value: any) {
    this.frmCntrlAcutocomplete.get('name').setValue(value);
  }

  handleClick(event) {
    let clickedComponent = event.target;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    this.itemsFiltereds = [];
  }

  formCustomValidatorName() {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      let selectboxValue = c.value;
      let pickedOrNot = (this.items) ? this.items.filter(item => item[this.autocompleteOptions.name] === selectboxValue) : [];
      if (pickedOrNot.length > 0) {
        // todo está bien. no devuelve ningún error. por lo tanto es nulo.
        return null;
      } else {
        // no hay un cuadro de selección seleccionado seleccionado. entonces devuelve el error de coincidencia.
        return { 'match': true };
      }
    };
  }

  formCustomValidatorId() {
    return (): { [key: string]: boolean } | null => {
      if (this.frmCntrlAcutocomplete) {
        let frmCntrlAcutocompleteNameValid = this.frmCntrlAcutocomplete.get('name').valid;
        // Comprueba que sea válido el Name
        if (frmCntrlAcutocompleteNameValid) {
          // Si el nombre es valido no devuelve ningún error
          return null;
        } else {
          // Si el nombre no es valido devuelve error
          return { 'match': true };
        }
        // Si aún no existe el formcontrol devuelve error.
      } else {
        return { 'match': true };
      }
    };
  }
}
