/**
 * 제네릭
 */
function func(value:any){
  return value;
}
let num = func(10); // type any
let bool = func(true); // type any
let str = func("string"); // type any

// 제네릭 함수
function func1<T>(value:T):T {
  return value;
}

let num2 = func1(10); // type number

if(typeof num2 === "number"){
  num2.toFixed();
}
let bool1 = func1(true); // type boolean
let str1 = func1("string"); // type string

let arr = func1<[number, number, number]>([1,2,3]); // type(튜플타입) [number, number, number]

/**
 * 타입변수 응용하기 
 * 첫번째 사례
 */ 
// 
// function swap<T>(a:T,b:T){
//   return [b,a];
// }
// const [a,b] = swap(1,"string"); 타입은 두가지인데 T는 하나이므로 에러가 발생 >> 제네릭 변수를 하나 더 명시해주는 것으로 해결 가능

function swap<T, U>(a:T, b:U){
  return [b,a];
}
const [a,b] = swap("string", 1); // a, b는 모두 string | number 유니온 타입을 가진다.

// 두번째 사례 
function returnFirstValue<T>(data:T[]) {
  /**
   * data:T[] 는 "원소가 전부 T인 배열"이라는 뜻이다. 
   * 그런데 various의 인자로 숫자와 문자열을 전달했기 때문에 TS는 이 배열의 원소타입을 number | string 으로 추론한다.
   * 즉 T = number | string 으로 결정된다.
   * 그래서 반환값 data[0]의 타입도 T, 즉 number | string이 된다.
   * 이건 유니온 타입의 기본 성질 때문에 자연스로운 결과이다.
   */
  return data[0];
}

let num4 = returnFirstValue([0,1,2]);
//0 

let various = returnFirstValue([1,"hello", "mynameis"]);  

/**
 * "첫번째 원소타입만 온전히 유지"하려면 왜 튜플이 필요한가?
 * data:[T, ...unknown[]]의 의미는 첫번째 원소는 반드시 T, 그 뒤 원소들은 개수 제한없이 올 수 있는데 타입은 unknown(즉, 안전하게 "모름")
 * 그래서 호출시 추론이 다음과 같이 된다.
 * returnFirstValue1([1, "hello"]) 에서 첫 원소가 1이므로 T = number
 * 뒤는 unknown[]로 흡수됨 > 결과적으로 반환타입이 number로 고정된다.
 * 이 패턴은 TS의 rest 요소를 가진 튜플타입(variadic tuple/rest elements)로 설명되는 기능이다.
 * unknown[]을 쓰는 이유
 * unknown은 안전한 최상위 타입이다. 무엇이든 unknown에 들어갈 수는 있지만, unknown 값을 아무런 연산 없이 바로 쓰는 건 금지(좁히기 필요)
 * 즉, "첫번째만 중요하고 나머지는 관심 없는데 타입 안정성은 유지하고 싶을경우" 에 사용한다.
 */
function returnFirstValue1<T>(data:[T, ...unknown[]]) {
  return data[0];
}

let num5 = returnFirstValue1([0,1,2]); // type: number

let various1 = returnFirstValue1([1,"hello", "mynameis"]);  // type: number



/**
 * 세번째 사례 (제네릭 제약)
 * 제네릭 변수를 타입 제한하기
 */
// T에 대한 "조건(제약)" : T는 아무 타입이나 될 수 있지만, 반드시 length: number 프로퍼티를 가진 타입만 허용한다.
// 입력 타입(T)를 그대로 유지한 채로 제약만 걸기위한 확장
function getLength<T extends { length:number }>(data:T) {
  return data.length;
}
let var1 = getLength([1,2,3]); // 배열도 length가 있음
let var2 = getLength("12345"); // 문자열도 length가 있음
let var3 = getLength({length:10}); // 직접 객체에 가지고 있음
// let var4 = getLength(10) // length 프로퍼티가 없으므로 에러발생