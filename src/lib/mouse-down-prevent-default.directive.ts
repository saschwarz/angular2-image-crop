import { Directive, HostListener } from '@angular/core';


@Directive({
  selector: '[preventDefault]'
})
export class MouseDownPreventDefaultDirective {

  @HostListener('mousedown', ['$event']) protected onPMouseDown(event) {
      event.preventDefault();
  }
}
