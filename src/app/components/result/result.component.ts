import { Input, Component, OnInit } from '@angular/core';
import {
    trigger,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'game-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
    animations: [
        trigger('showResult', [
            transition(':enter', [style({transform: 'translateX(-100%)'}), animate('.3s ease-out')]),
            transition(':leave', [animate('.3s ease-in', style({transform: 'translateX(100%)'}))])
        ])
    ]
})
export class ResultComponent implements OnInit {
    @Input() gameScore: any;
    @Input() message = 'Congratulations';

    constructor() { }

    ngOnInit() {
    }

}
