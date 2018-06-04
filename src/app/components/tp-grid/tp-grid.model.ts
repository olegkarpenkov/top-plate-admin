export class TpGridModel {

  private _cols: any[] = [];

  private _rows: any[] = [];

  private _events: any = {};

  private _refreshEvents (initialEvents) {
    let self = this;

    typeof initialEvents === 'object' && Object.keys(initialEvents).forEach(key => {
      self._events[key] = initialEvents[key];
    });
  }

  private _refreshRows (rows = []) {
    let self = this;
    rows.forEach((d, i) => {
      self._rows.push(new TpGridRowModel( d, i, () => self._cols ));
    });
  }

  public refreshRows (rows) {
    let self = this;
    self.clearRows();
    self._refreshRows(rows);
  }

  public addRows (rows = []) {
    let self = this;
    self._refreshRows(rows);
  }

  public clearRows () {
    let self = this;
    self._rows.length = 0;
  }

  public refreshCols (initialColsData) {
    let self = this;
    Array.isArray(initialColsData) &&
    initialColsData.forEach((d, i) => self._cols.push(new TpGridColumnModel(d, i, () => self._cols)));
  }

  public emitEvent (eventName, eventData = null) {
    let
      self = this,
      event = self._events[eventName];

    return typeof event === 'function' && event(eventData);
  }

  public getCols () {
    return this._cols;
  }

  public getRows () {
    return this._rows;
  }

  public toggleColumnSelected (colName) {
    let self = this;
    self._cols.forEach(col => {col.toggleSelected(col.name === colName); });
  }

  public toggleColumnReversed (colName) {
    let self = this;
    self._cols.forEach(col => col.name === colName && col.toggleReversed(!col.isReversed));
  }

  public get selectedColumn () {
    let self = this;
    return self._cols.filter(col => col.isSelected)[0];
  }

  constructor (cols, events) {
    let self = this;

    self._refreshEvents(events);
    self.refreshCols(cols);
  }
}

export class TpGridColumnModel {

  private _initialData: any;

  private _index: any;

  private _isSelected: Boolean = false;

  private _isReversed: Boolean = false;

  public name: any = '';

  public label: any = '';

  public type: any = 'string';

  public isSortable: Boolean = false;

  public get isSelected () {
    return this._isSelected;
  }

  public get isReversed () {
    return this._isReversed;
  }

  public getInitialData () {
    return this._initialData;
  }

  public getSiblings () {
    let self = this;
    return [];
  }

  public toggleSelected (state) {
    let self = this;
    self._isSelected = state;
  }

  public toggleReversed (state) {
    let self = this;
    self._isReversed = state;
  }

  constructor (
    datum,
    index,
    getSiblings
  ) {
    let self = this;

    self._initialData = datum;
    self._index = index;
    self.getSiblings = () => getSiblings();
    self.name = datum.name;
    self.label = datum.label;
    self.type = datum.type;
    self.isSortable = datum.sortable || false;
  }
}

export class TpGridRowModel {

  private _id: any;

  private _initialData: any;

  private _index: any;

  private _cells: any[] = [];

  private _isSelected: Boolean = false;

  private _isHovered: Boolean = true;

  public getColumns () {
    let self = this;
    return [];
  }

  public getCells () {
    let self = this;
    return self._cells;
  }

  public refreshCells () {
    let
      self = this,
      columns = self.getColumns(),
      initialData = self._initialData;

    columns.forEach((col, i) => {
      self._cells.push(new TpGridCellModel(
        initialData[col.name],
        i,
        () => self,
        () => col
      ));
    });
  }

  constructor (
    datum,
    index,
    getColumns
  ) {
    let self = this;

    self._id = datum._id;
    self._initialData = datum;
    self._index = index;
    self.getColumns = () => getColumns();
    self.refreshCells();
  }
}

export class TpGridCellModel {

  private _initialData: any;

  private _index: any;

  public type: any = 'string';

  public value: any = '';

  public getRow: any;

  public getColumn: any;

  public getStyle () {
    let
      self = this,
      col = self.getColumn(),
      colorSet = col.colorSet || {default: '#00f'};

    return {color: colorSet[self.value] || colorSet['default']};
  }

  constructor (
    datum,
    index,
    getRow,
    getColumn
  ) {
    let
      self = this,
      column = getColumn();

    self._initialData = datum;
    self._index = index;
    self.value = datum;
    self.type = column.type || self.type;
    self.getRow = () => getRow();
    self.getColumn = () => getColumn();
  }
}
