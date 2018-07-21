import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, never, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

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
    private timerCtrl: Subject<boolean>;

    private finish$: Subject<boolean>;

    private timer: Timer = {
        counter: 0,
        micros: 0,
        seconds: 0,
        minutes: 0
    };

    constructor() {
        // Order of subject initialization matters here.
        this.finish$ = new Subject<boolean>();
        this.timerCtrl = new Subject<boolean>();

        this.ticks$ = interval(100);
        this.timer$ = this.createTimer();

    }

    createTimer(): Observable<number> {
        return this.timerCtrl
        .pipe(
            switchMap(play => {
                return play ? this.ticks$ : never() ;
            }),
            takeUntil(this.finish$)
        );
    }

    ngOnInit() {
        this.timer$.subscribe(() => this.updateTimer());
        this.play();
    }

    play() {
        this.timerCtrl.next(true);
    }

    pause() {
        this.timerCtrl.next(false);
    }

    reset() {
        this.timer = {
            counter: 0,
            seconds: 0,
            minutes: 0,
            micros: 0
        };
    }

    updateTimer() {
        this.timer.micros = Math.floor(this.timer.counter % 10);
        this.timer.minutes = Math.floor((this.timer.counter / 10) / 60);
        this.timer.seconds = Math.floor((this.timer.counter / 10) % 60);

        ++ this.timer.counter;
    }

    formatTimer() {
        return `
            ${('' + this.minutes).padStart(2, '0')} :
            ${('' + this.seconds).padStart(2, '0')} :
            ${('' + this.micros).padStart(2, '0')}
        `;
    }

    get minutes() {
        return this.timer.minutes;
    }

    get seconds() {
        return this.timer.seconds;
    }

    get micros() {
        return this.timer.micros;
    }

    ngOnDestroy() {
        this.finish$.next(true);
    }
}
