import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public text: string;

  @ViewChild('AsEditor') asEditor;

  public displayAddDialog = false;
  public newName: string;
  public text2: string;


  onEditorInit() {
    // We need to replace the tab key normal binding of Quill to be able to use it to move to next/previous field
    console.log('*** onEditorInit');

    setTimeout(() => {
        // tslint:disable-next-line:no-console
        console.debug(`Keyboard binding: ${JSON.stringify(this.asEditor.getQuill().keyboard.bindings['9'])}`);
        this.asEditor.getQuill().keyboard.bindings['9'] = [{
          key: 'tab',
          handler() {
            // console.debug('Quill: Bind tab to nothing!');
            return true;
          }
        }];
      },
      0);

  }

  public close() {
    this.displayAddDialog = false;
  }

  public open() {
    this.displayAddDialog = true;
    setTimeout( () => {
      document.getElementById('firstInput').focus();
    }, 100);
  }
}
