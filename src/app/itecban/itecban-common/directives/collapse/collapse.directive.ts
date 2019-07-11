import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[AppScrollCollapseEmitter]'
})
export class ScrollCollapseEmitterDirective {

    lastScrollTop = 0;

    constructor(el: ElementRef, private renderer: Renderer2) {
        this.lastScrollTop = el.nativeElement.scrollTop;
        this.renderer.addClass(el.nativeElement, 'scroll-collapse-emitter');
    }

    @HostListener('scroll', ['$event', '$event.target'])
    onElementScroll(_event, targetElem: HTMLElement): void {
        if (targetElem) {
            let currentScroll = targetElem.scrollTop;
            const $elementReceiver = document.querySelector('.scroll-collapse-receiver');
            if ((currentScroll > this.lastScrollTop + 50)) {
                if ($elementReceiver && (this.lastScrollTop > 0)) {
                    $elementReceiver.classList.add('scroll-collapse-receiver-minify');
                    targetElem.classList.add('scroll-collapse-emitter-up');
                    targetElem.scrollTop = targetElem.scrollTop + 10;
                }
                this.lastScrollTop = currentScroll;
            } else {
                if ((currentScroll === 0)) {
                    $elementReceiver.classList.remove('scroll-collapse-receiver-minify');
                    targetElem.classList.remove('scroll-collapse-emitter-up');
                    this.lastScrollTop = currentScroll;
                }
            }
        }
    }
}

@Directive({
    selector: '[AppScrollCollapseReceiver]'
})
export class ScrollCollapseReceiverDirective {

    lastScrollTop = 0;


    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.addClass(el.nativeElement, 'scroll-collapse-receiver');
        this.el.nativeElement.querySelector('.scroll-collapse-receiver-buttom');

    }

    @HostListener('click', ['$event', '$event.target'])
    onClick(_event: MouseEvent, $targetElem: HTMLElement): void {
        // let btnOpen = this.el.nativeElement.querySelector('.scroll-collapse-receiver-buttom')
        if ($targetElem.className === 'scroll-collapse-receiver-buttom') {
            this.el.nativeElement.classList.remove('scroll-collapse-receiver-minify');
        }
    }


}
