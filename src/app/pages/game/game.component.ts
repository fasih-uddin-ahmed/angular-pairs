import { Component, OnInit } from '@angular/core';

export interface CellData {
    idx: number;
    textValue: string;
    flip: boolean;
    disabled: boolean;
}

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    private gridData: Array<CellData> = [];
    private difficulty = 'easy';

    private difficultyMap = {
        easy: 6,
        medium: 8,
        hard: 10
    };

    constructor() {
        this.populateGridData();
    }

    updateGame(id: number) {
        this.gridData[id].flip = true;
    }

    populateGridData() {
        const range = Array.from({length: 12}, (_, id) => id);
        range.forEach(val => {
            this.gridData.push({
                idx: val,
                textValue: '' + val,
                flip: false,
                disabled: false
            });
        });
    }

    ngOnInit() {
    }

}
