import { Component, OnInit } from '@angular/core';
import { BoardMenuItem } from './side-menu/models/board-menu-item';
import { BoardService } from './board/services/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    // TODO: get default board (last created, active etc.)
  }

  getBoardMenuItems = () => this.boardService.getBoards().map(board => new BoardMenuItem(board.getId(), board.getTitle()));
}
