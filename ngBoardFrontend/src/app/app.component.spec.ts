/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { SideMenuModule } from './side-menu/side-menu.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NoteComponent } from './note/note.component';
import { BoardModule } from './board/board.module';


describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BoardModule,
        RouterTestingModule,
        SideMenuModule
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
