import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, never, Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

export interface Timer {
    counter: number;
    micros: number;
    seconds: number;
    minutes: number;
}

@Component({
    selector: 'game-timer',
    templateUrl: './game-timer.component.html',
    styleUrls: ['./game-timer.component.scss']
})
export class GameTimerComponent implements OnInit, OnDestroy {
    private timer$: Observable<number>;
    private ticks$: Observable<number>;
    private timerCtrl: Subject<boolean> = new Subject<boolean>();

    private timer: Timer = {
        counter: 0,
        micros: 0,
        seconds: 0,
        minutes: 0
    };

    constructor() {
        this.ticks$ = interval(100);
        this.timerCtrl.next(false);
        this.timer$ = this.createTimer();
    }

    createTimer(): Observable<number> {
        return this.timerCtrl
        .pipe(
            // startWith(false),
            switchMap(paused => {
                return paused ? never() : this.ticks$;
            })
        );
    }

    ngOnInit() {
        this.timerCtrl.next(false);
        this.timer$.subscribe(() => this.updateTimer());
    }

    updateTimer() {
        console.log('fired');
        this.timer.micros = this.timer.counter % 10;
        this.timer.minutes = (this.timer.counter / 10) / 60;
        this.timer.seconds = (this.timer.counter / 10) % 60;

        ++ this.timer.counter;
    }

    formatTimer() {
       return `${this.timer.minutes} + ${this.timer.seconds} + ${this.timer.micros}`;
    }

    ngOnDestroy() {

    }
}
