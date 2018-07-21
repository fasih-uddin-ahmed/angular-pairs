import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
    selector: 'top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    @Input() score: number;
    @Input() homeLink: string;

    constructor() { }

    ngOnInit() {
    }

}
