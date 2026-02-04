/**
 * infer(inference) : 추론
 */

type FuncA = () => string;
type FuncB = () => number;

type ReturnType1<T> = T extends () => infer R ? R : never;

type A = ReturnType1<FuncA>; // string
type B = ReturnType1<FuncB>; // number


/**
 * 예제
 */

type Person = {
  name: string;
  age: number;
  address: string;
} 
type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
// 1. T는 프로미스 타입이어야 한다.
// 2. 프로미스 타입의 결과값 타입을 반환해야 한다.
type PromiseA = PromiseUnpack<Promise<number>>; // number

type PromiseB = PromiseUnpack<Promise<string>>; // string

type PromiseC = PromiseUnpack<Promise<Person>>; // {name: string; age: number; address: string;}
