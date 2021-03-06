import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Rx';

import { ModalComponent } from './../shared/modal/modal.component';
import { CreateNoteComponent } from './create-note/create-note.component';
/* tslint:disable:no-unused-variable */

import { BoardComponent } from './board.component';
import { BoardService } from './services/board.service';

import { NoteComponent } from '../note/note.component';
import { NoteService } from '../note/services/note.service';


import { Note } from '../note/models/note';
import { Board } from './models/board';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  let mockBoard: Board;
  let mockNotes: Note[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        CreateNoteComponent,
        BoardComponent,
        NoteComponent,
        ModalComponent
      ],
      providers: [
        BoardService,
        NoteService,
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 1 }]) } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;

    mockNotes = [
      new Note(1, 1, 'There is no spoon', 'Neo', 100, 300, 1),
      new Note(2, 1, 'I\'m going to make him an offer he can\'t refuse.', 'Corleone', 200, 500, 1)
    ];

    mockBoard = new Board(1, 'test board', 'test creator');
    mockBoard.Notes = mockNotes;

    component.Board = mockBoard;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display notes in divs', () => {
    fixture.detectChanges();

    let noteDivs = fixture.debugElement.queryAll(By.css('.data-test-note'));

    noteDivs.forEach((de, index) => {
      let divContent = de.nativeElement.textContent;
      let expectedContent = mockNotes[index].Text;

      expect(divContent).toContain(expectedContent);
    });
  });

  it('should display a title in h1', () => {
    fixture.detectChanges();

    let titleDebugElement = fixture.debugElement.query(By.css('.data-test-board-title'));

    expect(titleDebugElement.nativeElement.innerText).toContain('January 2017');
  });

  it('should display each note in its position', () => {
    fixture.detectChanges();

    let noteDivs = fixture.debugElement.queryAll(By.css('.data-test-note'));

    noteDivs.forEach((de, index) => {
      let note = mockNotes[index];

      expect(de.nativeElement.style.top).toBe(note.Top + 'px');
      expect(de.nativeElement.style.left).toBe(note.Left + 'px');
      expect(de.nativeElement.style.zIndex).toBe(note.ZIndex.toString());
    });
  });

  it('should show add note modal when Add note button is clicked', () => {
    component.addNoteModal.modal.closeModal();

    let addNoteButton = fixture.debugElement.query(By.css('.data-test-add-note-button'));
    addNoteButton.triggerEventHandler('click', null);

    expect(component.addNoteModal.modal.isOpened()).toBeTruthy();
  });

  it('should add note to board notes collection when onNoteCreated called', () => {
    let note = new Note(3, 1, 'some text', 'some author', 100, 200, 1);
    component.onNoteCreated(note);
    expect(component.Board.Notes[2].Id).toBe(note.Id);
  });

  it('should show add note modal when board is double clicked', () => {
    component.addNoteModal.modal.closeModal();

    let board = fixture.debugElement.query(By.css('.data-test-table-div'));

    let clickEvent = {
      pageX: 100,
      pageY: 200
    };

    board.triggerEventHandler('dblclick', clickEvent);

    expect(component.addNoteModal.modal.isOpened()).toBeTruthy();
  });

  it('should set note coordinates when board is double clicked', () => {
    let board = fixture.debugElement.query(By.css('.data-test-table-div'));

    let clickEvent = {
      pageX: 100,
      pageY: 200
    };

    board.triggerEventHandler('dblclick', clickEvent);

    expect(component.addNoteModal.Left).toBe(100);
    expect(component.addNoteModal.Top).toBe(200);
  });
});
