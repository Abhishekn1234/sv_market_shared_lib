import { Strategy } from "passport-jwt";
declare const AuthStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class AuthStrategy extends AuthStrategy_base {
    constructor();
    validate(payload: any): Promise<any>;
}
export {};
