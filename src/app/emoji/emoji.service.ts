import { Inject, Injectable } from '@angular/core';
import { Emoji } from './emojis';
import shuffle from 'lodash.shuffle';

@Injectable({
    providedIn: 'root'
})
export class EmojiService {
    private emojiSampleSpace: Array<string>;

    constructor(@Inject(Emoji) emojis) {
        this.emojiSampleSpace = emojis;
    }

    public generateEmojiParis(pairs: number): Array<string> {
        this.emojiSampleSpace = shuffle(this.emojiSampleSpace);

        const emojiSlice = this.emojiSampleSpace.slice(0, pairs);

        return shuffle([...emojiSlice, ...emojiSlice]);
    }
}
