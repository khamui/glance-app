// PLUGINS enabled:
// Collapsing Columns
// Context Menu
// Hiding Columns --> tbd
// Search for Values --> tbd
// Select (Dropdown in Cell) --> tbd
// Nested Headers
// Highlight selection (row, col) --> tbd
// More Plugins: https://handsontable.com/docs/7.3.0/tutorial-features.html

// const collapsibleColsArray = [{row: -2, col: 2, collapsible: true}];

export let CONFIG = {
  id: null,
  colHeaders: true,
  manualRowMove: true,
  contextMenu: true,
  hiddenColumns: {
    copyPasteEnabled: false,
    indicators: true,
    columns: [0, 1],
  },
  // collapsibleColumns: collapsibleColsArray,
  licenseKey: 'non-commercial-and-evaluation',
};
