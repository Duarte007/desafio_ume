export class ResponseAdapter {
  static create(type: string, status: string, result?: any, violation?: string) {
    return {
      type,
      status,
      result: result,
      violation,
    };
  }
}
