export default class Attachment {
  private readonly _id: string;
  private readonly _type: string;
  private readonly _name: string;
  private readonly _size: number;
  private readonly _url: string;

  constructor(
    _id: string,
    _type: string,
    _name: string,
    _size: number,
    _url: string
  ) {
    this._id = _id;
    this._type = _type;
    this._name = _name;
    this._size = _size;
    this._url = _url;
  }

  public get id(): string {
    return this._id;
  }

  public get type(): string {
    return this._type;
  }

  public get name(): string {
    return this._name;
  }

  public get size(): number {
    return this._size;
  }

  public get url(): string {
    return this._url;
  }
}
