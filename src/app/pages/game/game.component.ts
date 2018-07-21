import { Inject, Component, OnInit } from '@angular/core';

import { EmojiService } from '../../emoji/emoji.service';

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

    constructor(private emojiService: EmojiService) {
        this.populateGridData();
    }

    updateGame(id: number) {
        this.gridData[id].flip = true;
    }

    populateGridData() {
        this.emojiService.generateEmojiParis(6)
            .forEach((val, idx) => {
                this.gridData.push({
                    idx: idx,
                    textValue: val,
                    flip: false,
                    disabled: false
                });
            });
    }

    ngOnInit() {
    }

}
