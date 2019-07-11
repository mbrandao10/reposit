import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

export const enum SwipeType {
    SwipeRight = 'RIGHT',
    SwipeLeft = 'LEFT'
}

@Directive({
    exportAs: 'osbSwipe',
    selector: 'osbSwipe,[osbSwipe]'
})
export class SwipeDirective {

    deltaX = 0;
    deltaY = 0;

    readonly desviation: number = 1;
    countSuccess = 0;

    swipeRelease = false;

    readonly durationController = 5;

    @Output()
    swipeEventDetected: EventEmitter<SwipeType> = new EventEmitter<SwipeType>();

    constructor() { }

    @HostListener('touchstart', ['$event'])
    onTouchStart(event: TouchEvent | any) {
        this.onTouch(event, 'begin');
    }
    @HostListener('touchmove', ['$event'])
    onTouchMove(event: TouchEvent | any) {
        this.onTouch(event, 'selecting');
    }
    @HostListener('touchend', ['$event'])
    onTouchEnd(event: TouchEvent | any) {
        this.onTouch(event, 'end');
    }


    private onTouch(event: TouchEvent | any, eventType: string) {

        // console.log( eventType )
        event.preventDefault(); // disable the swiping
        if (eventType === 'selecting' && !this.swipeRelease) {
            if (this.deltaX === 0 && this.deltaY === 0) {
                // empieza el evento
                this.deltaX = event.changedTouches[0].clientX;
                this.deltaY = event.changedTouches[0].clientY;
                return;
            }

            if (Math.abs((this.deltaX - event.changedTouches[0].clientX)) > this.desviation) {
                ++this.countSuccess;
            }

            if (this.countSuccess > this.durationController) {
                if (this.deltaX > event.changedTouches[0].clientX) {
                    this.swipeEventDetected.emit(SwipeType.SwipeLeft);
                } else {
                    this.swipeEventDetected.emit(SwipeType.SwipeRight);
                }
                this.swipeRelease = true;
            }

        } else if (eventType === 'end') {
            this.deltaX = 0;
            this.deltaY = 0;
            this.countSuccess = 0;
            this.swipeRelease = false;

        }

    }

}
