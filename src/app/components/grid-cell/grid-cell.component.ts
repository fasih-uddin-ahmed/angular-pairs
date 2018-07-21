import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'grid-cell',
    templateUrl: './grid-cell.component.html',
    styleUrls: ['./grid-cell.component.scss']
})
export class GridCellComponent implements OnInit {
    @Input() idx: number;
    @Input() textValue: string;
    @Input() flip: boolean;
    @Input() disabled: boolean; // use attribute binding here.

    @Output() cellFlipped: EventEmitter<number>;

    constructor() {
        this.cellFlipped = new EventEmitter<number>();
    }

    ngOnInit() {
    }

    toggle() {
        this.cellFlipped.emit(this.idx);
    }

}
