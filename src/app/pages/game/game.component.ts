import { Inject, Component, OnInit } from '@angular/core';

import { Emoji } from '../../emoji/emojis';

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
    private gameScore = 0;

    private gridData: Array<CellData> = [];
    private difficulty = 'easy';

    private difficultyMap = {
        easy: 6,
        medium: 8,
        hard: 10
    };

    constructor(@Inject(Emoji) private emojis) {
        this.populateGridData();
        console.log(this.gridData);
    }

    updateGame(id: number) {
        this.gridData[id].flip = true;
    }

    populateGridData() {
        this.emojis.slice(0, 12).forEach((val, idx) => {
            this.gridData.push({
                idx: idx,
                textValue: '' + val,
                flip: false,
                disabled: false
            });
        });
    }

    ngOnInit() {
    }

}
