
/* tslint:disable:no-bitwise */
export enum Interceptor {
  None,
  Token = 1 << 0,
  Error = 1 << 1,
  All = ~(~0 << 2)
}
/* tslint:enable:no-bitwise */
