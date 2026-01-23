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
// Union 타입은 내부의 타입 중 하나를 선택하는 것이므로, 선택한 타입의 필수 프로퍼티는 모두 포함해야 한다.
// 따라서 교집합 프로퍼티(name)만 작성하면 Dog 타입도, Person 타입도 만족하지 못하므로 오류가 발생한다.
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

// 암묵적인 any 타입 (타입이 계속 갱신되며 진화함 - Any Type Evolution)
let d; // 타입을 명시하지 않고 변수를 선언하면 암묵적으로 any 타입이 되며, 이후 할당되는 값에 따라 타입이 진화한다.
d = 10;
d.toFixed(); 

d = "hello";
d.toUpperCase();