export class User {
  /**
   *
   */
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDuration: Date
  ) {}

  get token() {
    if (
      !this._tokenExpirationDuration ||
      new Date() > this._tokenExpirationDuration
    ) {
      return null;
    }
    return this._token;
  }
}
