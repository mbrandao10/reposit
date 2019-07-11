import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[OsbVAlign]'
})
export class VAlignDirective implements AfterViewInit {

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngAfterViewInit(){
        let screenHeight = window.innerHeight;
        let elemHeight = this.el.nativeElement.offsetHeight;
        let paddingTop = (screenHeight / 2) - (elemHeight / 2);
        this.renderer.setStyle(this.el.nativeElement, 'margin-top', paddingTop + 'px');
    }
}




