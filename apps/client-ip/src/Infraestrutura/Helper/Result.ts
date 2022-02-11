export class Result<T = null> {
  public static ok<T = null>(data: T = null, code: number | string = 0) {
    return new this(code, data, true, 'success');
  }

  public static fail<T = null>(
    message: string,
    code: number | string = 0,
    data: T | null = null,
  ) {
    return new this(code, data, false, message);
  }

  public constructor(
    public code: number | string,
    public data: T | null,
    public success: boolean,
    public message: string,
  ) {}

  public setCode(code: number | string) {
    this.code = code;
  }

  public setData(data: T | null) {
    this.data = data;
  }

  public setSuccess(success: boolean) {
    this.success = success;
  }

  public setMessage(message: string) {
    this.message = message;
  }
}
