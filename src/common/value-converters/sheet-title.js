export class SheetTitleValueConverter {
  toView(value) {
    return value === 'expenses' ? 'Your outgoing 💸' : 'Your incoming 💰';
  }
}
