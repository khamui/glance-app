import { bindable } from 'aurelia-framework';

export type TNotification = {
  dismissed: boolean;
  dismissable: boolean;
  text: string;
};

export class Notification {
  @bindable notifications: TNotification[];

  dismiss(note: TNotification) {
    note.dismissed = true;
  }
}
