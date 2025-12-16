import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../header/header";
import { Menu } from "../menu/menu";

@Component({
  selector: 'app-layout',
  imports: [Header, Menu, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
