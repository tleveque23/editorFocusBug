import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public text: string;

  @ViewChild('AsEditor') asEditor;
  @ViewChild('editorContainer') editorContainer: ElementRef;
  public displayAddDialog = false;
  public newName: string;


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

    this.setNoTabIndex();
  }

  private setNoTabIndex() {
    if (this.editorContainer) {
      // tslint:disable-next-line:no-console
      console.debug(`*** setNoTabIndex`);

      setTimeout( () => {
        // tslint:disable-next-line:max-line-length
        const header = (this.editorContainer.nativeElement as HTMLSpanElement).firstElementChild.firstElementChild.firstElementChild.firstElementChild;
        // console.debug(`*** header is ${header.tagName}`);
        this.setNoTabIndexForChildren(header.children);
      }, 0);
    }
  }

  private setNoTabIndexForChildren(children: HTMLCollection) {
    if ( children && children.length > 0 ) {
      for ( let i = 0; i < children.length; i++) {
        const child = children.item(i);
        // console.debug(`Child is of mimeType: ${child.tagName}, class = ${child.className}`);
        if (child.tagName === 'SPAN') {
          child.setAttribute('tabindex', '-1');
        }
        this.setNoTabIndexForChildren(child.children); // recursive call
      }
    }
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
