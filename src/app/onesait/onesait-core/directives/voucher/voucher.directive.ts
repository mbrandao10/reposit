import { Directive, ElementRef, ContentChild, Renderer2 } from '@angular/core';

@Directive({
    selector: '[OsbVoucherValue]'
})
export class VoucherValueDirective {

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        this.renderer.addClass(el.nativeElement, 'voucherValue');
    }

    getValue() {
        return this.el.nativeElement.innerHTML;
    }
}

@Directive({
    selector: '[OsbVoucherKey]'
})
export class VoucherKeyDirective {

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        this.renderer.addClass(el.nativeElement, 'voucherKey');
    }

    getKey() {
        let key = this.el.nativeElement.innerHTML;
        if (this.el.nativeElement.getAttribute('prefix')){
            key = this.el.nativeElement.getAttribute('prefix') + '.' + key;
        }
        return key;
    }
}

@Directive({
    selector: '[OsbVoucherKeyValue]'
})
export class VoucherKeyValueDirective {

    @ContentChild(VoucherKeyDirective) key: VoucherKeyDirective;
    @ContentChild(VoucherValueDirective) value: VoucherValueDirective;

    constructor(
        el: ElementRef,
        private renderer: Renderer2
    ) {
        this.renderer.addClass(el.nativeElement, 'voucherKeyValue');
    }

    getKey(): string {
        return this.key.getKey();
    }

    getValue(): string {
        return this.value.getValue();
    }
}



