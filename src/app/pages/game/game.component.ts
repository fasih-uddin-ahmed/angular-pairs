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
    private moves = 0;

    public gameScore = {
        score: 0,
        bonus: 0,
        totalScore: 0
    };

    public gridData: Array<CellData> = [];
    private difficulty = 'easy';
    private selection: Array<CellData> = [];

    private showDialog = false;

    private difficultyMap = {
        easy: 6,
        medium: 8,
        hard: 10
    };

    private bonus = {
        easy: 1000,
        medium: 5000,
        hard: 10000
    };

    constructor(private emojiService: EmojiService) {
        this.populateGridData();
    }

    updateGame(id: number) {
        this.gridData[id].flip = true;
        this.selection.push(this.gridData[id]);

        if (this.selection.length === 2) {
            this.moves += 1;
            setTimeout(() => {
                const cell2 = this.selection.pop();
                const cell1 = this.selection.pop();
                if (cell2.textValue === cell1.textValue) {
                    console.log('matched');
                    cell2.disabled = cell1.disabled = true;
                    if ( this.gameOver() ) {
                        this.processResult();
                        this.showResult();
                    }
                    this.gameScore.score += 20;
                } else {
                    console.log('not matched');
                    cell2.flip = cell1.flip = false;
                }
            }, 800);
        }
    }

    gameOver(): boolean {
        return this.gridData
            .filter(cell => cell.disabled !== true).length === 0;
    }

    processResult() {
        const numberOfPairs = this.difficultyMap[this.difficulty];
        const baseBonus = this.bonus[this.difficulty];
        this.gameScore.bonus = (numberOfPairs * 1.5) / this.moves * baseBonus;
        this.gameScore.totalScore = this.gameScore.score + this.gameScore.bonus;
    }

    showResult() {
        this.showDialog = true;
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
