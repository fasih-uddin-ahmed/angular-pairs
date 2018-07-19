import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'grid-cell',
    templateUrl: './grid-cell.component.html',
    styleUrls: ['./grid-cell.component.scss']
})
export class GridCellComponent implements OnInit {
    toggle = false;

    constructor() { }

    ngOnInit() {
    }

    toggleFlip() {
        console.log('toggling cell');
        this.toggle = !this.toggle;
    }

}
