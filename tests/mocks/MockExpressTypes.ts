import { Request, Response } from 'express';

export class MockRequest {
  body: any = {};
  params: any = {};
  query: any = {};
  headers: any = {};

  constructor(options: Partial<Request> = {}) {
    Object.assign(this, options);
  }
}

export interface MockResponseType extends Response {
  body: any;
}

export class MockResponse {
  statusCode: number = 200;
  body: any = null;
  headers: Record<string, string> = {};

  status(code: number): this {
    this.statusCode = code;
    return this;
  }

  json(data: any): this {
    this.body = data;
    return this;
  }

  send(data: any): this {
    this.body = data;
    return this;
  }

  setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }
}

export function createMockRequest(options: Partial<Request> = {}): Request {
  return new MockRequest(options) as unknown as Request;
}

export function createMockResponse(): MockResponseType {
  return new MockResponse() as unknown as MockResponseType;
}
