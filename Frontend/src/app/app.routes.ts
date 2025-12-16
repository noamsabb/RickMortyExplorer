import { Routes } from '@angular/router';
import { Home } from './components/pages-area/home/home';
import { List } from './components/characters-area/list/list';


export const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: "full"},
    { path: "home", component: Home },
    { path: "list", component: List },
    //TODO:
    // {path: "characters/details/:id", component: CharacterDetails},
    // {path: "**", component: Page404},

];
