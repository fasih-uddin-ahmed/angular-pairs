import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { GameComponent } from './pages/game/game.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { GridCellComponent } from './components/grid-cell/grid-cell.component';
import { GameTimerComponent } from './components/game-timer/game-timer.component';

import { Emoji, EMOJIS } from './emoji/emojis';
import { EmojiService } from './emoji/emoji.service';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'game', component: GameComponent },
    { path: 'about', component: AboutComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        MenuComponent,
        GameComponent,
        TopBarComponent,
        GridCellComponent,
        GameTimerComponent,
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule
    ],
    providers: [
        {provide: Emoji, useValue: EMOJIS},
        [EmojiService]
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
