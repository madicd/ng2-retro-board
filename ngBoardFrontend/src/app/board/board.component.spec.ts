import { FormsModule } from '@angular/forms';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddNoteModalComponent } from './add-note-modal/add-note-modal.component';
import { BoardComponent } from './board.component';
import { NoteComponent } from '../note/note.component';
import { BoardService } from './services/board.service';

import { NoteCoords } from '../note/models/note-coords';
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
        AddNoteModalComponent,
        BoardComponent,
        NoteComponent
      ],
      providers: [BoardService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;

    mockNotes = [
      new Note('Everything is fine', 'John', new NoteCoords(20, 50, 1)),
      new Note('Focus groups are great', 'Sue', new NoteCoords(120, 200, 2)),
      new Note('Food can be better', 'Mike', new NoteCoords(300, 100, 3))
    ];

    mockBoard = new Board(1, 'test board', 'test creator');
    mockBoard.setNotes(mockNotes);

    component.setBoard(mockBoard);

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
      let expectedContent = mockNotes[index].text;

      expect(divContent).toContain(expectedContent);
    });
  });

  it('should display a title in h1', () => {
    fixture.detectChanges();

    let titleDebugElement = fixture.debugElement.query(By.css('.data-test-board-title'));

    expect(titleDebugElement.nativeElement.innerText).toContain('test board');
  });

  it('should display each note in its position', () => {
    fixture.detectChanges();

    let noteDivs = fixture.debugElement.queryAll(By.css('.data-test-note'));

    noteDivs.forEach((de, index) => {
      let note = mockNotes[index];

      expect(de.nativeElement.style.top).toBe(note.coords.top + 'px');
      expect(de.nativeElement.style.left).toBe(note.coords.left + 'px');
      expect(de.nativeElement.style.zIndex).toBe(note.coords.zIndex.toString());
    });
  });

  it('should show add note modal when Add note button is clicked', () => {
    // Make sure modal is hidden
    component.addNoteModal.modal.nativeElement.style.display = 'none';

    let addNoteButton = fixture.debugElement.query(By.css('.data-test-add-note-button'));
    addNoteButton.triggerEventHandler('click', null);

    expect(component.addNoteModal.modal.nativeElement.style.display).toContain('block');
  });
});
