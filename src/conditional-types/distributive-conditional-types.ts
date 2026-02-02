/**
 * 분산적인 조건부 타입
 */
type StringNumberSwitch<T> = T extends number ? string : number;
let a: StringNumberSwitch<number>;
let b: StringNumberSwitch<string>;
let c: StringNumberSwitch<number | string>;
