import { Directive, HostListener } from '@angular/core';
import { MenuService } from '../../services/menu-service/menu.service';

@Directive({
    selector: '[OsbCloseMenu]'
})
export class CloseMenuDirective {

    constructor(private menuService: MenuService) {
    }

    @HostListener('click', ['$event'])
    onClick(_event: MouseEvent): void {
        this.menuService.clickOutside();
    }
}
