/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { BoardService } from './board.service';
import { NoteService } from '../../note/services/note.service';

import { Board } from '../models/board';
import { Note } from '../../note/models/note';

describe('BoardService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardService,
        NoteService
      ]
    });
  });

  it('should ...', inject([BoardService], (service: BoardService) => {
    expect(service).toBeTruthy();
  }));

  it('should set all boards correctly', inject([BoardService], (service: BoardService) => {
    const boards = createDummyBoards();
    service.setBoards(boards);
  }));

  function createDummyBoards(): Board[] {
    const notes1 = [
      new Note(1, 1, 'There is no spoon', 'Neo', 100, 300, 1),
      new Note(2, 1, 'I\'m going to make him an offer he can\'t refuse.', 'Corleone', 200, 500, 1)
    ];

    const notes2 = [
      new Note(3, 2, 'Do. Or do not. There is no try', 'Yoda', 100, 1000, 1),
      new Note(4, 2, 'Impressive. Most impressive. Obi-Wan has taught you well. You have controlled your fear. ' +
        'Now, release your anger. Only your hatred can destroy me.', 'Vader', 200, 500, 1)
    ];

    const board1 = new Board(1, 'January 2017', 'Sale');
    board1.setNotes(notes1);

    const board2 = new Board(2, 'March 2017', 'Masi');
    board2.setNotes(notes2);

    return [board1, board2];
  }
});
