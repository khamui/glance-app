export class SheetTitleValueConverter {
  toView(value) {
    return value === 'expenses' ? 'Your outgoing benjamins...' : 'Your incoming dollars...';
  }
}
