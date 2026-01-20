/**
 * 대수 타입
 * -> 여러 개의 타입을 합성해서 새롭게 만들어낸 타입
 * -> 합집합 타입과 교집합 타입이 존재
 */

/**
 * 1. 합집합 - Union 타입
 */
let a: string | number | boolean;
a=1;
a="hello";
a = true;

let arr: (number | string | boolean)[]=[1,"hello", true];

type Dog ={
  name: string;
  color: string;
}

type Person = {
  name:string;
  language:string;
}
type Union1 = Dog | Person;

let union1: Union1 = {
  name: "",
  color: "",
}

let union2: Union1 = {
  name: "",
  language: ""
}

let union3: Union1 = {
  name: "",
  color: "",
  language:""
}
// 합집합처럼 모든 프로퍼티를 선언하는것은 허용되지만, 교집합에 해당하는 프로퍼티만 선언하는것은 허용되지 않는다.
// let union4: Union1 = { // Error
//   name: "",
// }

/**
 * 2. 교집합 타입 - Intersection 타입
 */
// 기본타입으로 교집합타입을 선언하면 겹치는게 없어서 공집합을 의미하는 never 타입이 된다.
// 따라서 교집합타입은 겹치는게 없는 기본타입이 아닌 객체 타입에 사용한다.
let variable: number & string;

type Dog2 ={
  name: string;
  color: string;
}

type Person2 = {
  name:string;
  language:string;
}

type Intersection = Dog2 & Person2;


let intersection1: Intersection = {
  name: "",
  color: "",
  language:""
}

// 암묵적인 any 타입 (타입이 계속 갱신되며 진화함)
let d; // 타입을 명시하지 않고 변수를 생성만하면 d라는 변수는 암묵적으로 any타입으로 적용되어 any 타입의 성격을 가진다.