import { bindable } from 'aurelia-framework';
import {TNotification} from 'glancetypes';

export class Notification {
  @bindable notifications: TNotification[];

  dismiss(note: TNotification) {
    note.dismissed = true;
  }
}
