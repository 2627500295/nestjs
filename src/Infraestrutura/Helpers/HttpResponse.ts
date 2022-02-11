export class HttpResponse<TData> {
  public static valueOf() {
    return new this();
  }

  /**
   * 成功
   */
  public static success<TData>(data?: TData) {
    const value = this.valueOf();

    value.code = 0;
    value.data = data || null;
    value.success = true;
    value.message = 'success';

    return value;
  }

  /**
   * 成功
   */
  public static failure(code?: string);
  public static failure(code: number, message: string);
  public static failure<TData>(code: number, message: string, data: TData);
  public static failure(code?: any, message?: any, data?: any) {
    const value = this.valueOf();

    value.code = -1;

    value.data = null;

    value.success = false;

    if (typeof code === 'string') {
      value.message = code;
    } else if (typeof code === 'number') {
      value.code = code;
    }

    if (typeof message === 'string') {
      value.message = message;
    }

    if (data) {
      value.data = data;
    }

    return value;
  }

  private code: number;

  private data: TData;

  private message: string;

  private success: boolean;

  /**
   * 设置状态码
   *
   * @param code - 状态码
   *
   * @defaultValue 0
   */
  public setCode(code: number) {
    this.code = code;
    return this;
  }

  /**
   * 设置消息
   *
   * @param message - 消息
   *
   * @defaultValue "success"
   */
  public setMessage(message: string) {
    this.message = message;
    return this;
  }

  /**
   * 设置数据
   *
   * @param data - 消息
   *
   * @defaultValue null
   */
  public setData(data: TData) {
    this.data = data;
    return this;
  }

  /**
   * 是否成功
   */
  public isSuccess() {
    return this.success;
  }
}
