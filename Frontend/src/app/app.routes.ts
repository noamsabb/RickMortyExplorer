import { Routes } from '@angular/router';
import { Home } from './components/pages-area/home/home';
import { List } from './components/characters-area/list/list';
import { Favorites } from './components/user-area/favorites/favorites';
import { Page404 } from './components/pages-area/page404/page404';


export const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: "full"},
    { path: "home", component: Home },
    { path: "list", component: List },
    { path: "favorites", component: Favorites },
    {path: "**", component: Page404},

];
