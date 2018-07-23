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
    private selection: Array<CellData> = [];

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
        this.selection.push(this.gridData[id]);

        if (this.selection.length === 2) {
            setTimeout(() => {
                const cell2 = this.selection.pop();
                const cell1 = this.selection.pop();
                if (cell2.textValue === cell1.textValue) {
                    console.log('matched');
                    cell2.disabled = cell1.disabled = true;
                    this.gameScore += 20;
                } else {
                    console.log('not matched');
                    cell2.flip = cell1.flip = false;
                }
            }, 800);
        }
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
