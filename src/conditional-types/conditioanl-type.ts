/**
 * 조건부타입
 * extends키워드와 삼항연산자를 사용하여 타입을 결정함
 */

type A = number extends string ? string : number;

type ObjA = {
  a: number;
}
type ObjB = {
  a: number;
  b: number;
}

type B = ObjB extends ObjA ? number : string;

/**
 * 제네릭과 조건부 타입
 */
type StringNumberSwitch<T> = T extends number ? string : number;

let varA : StringNumberSwitch<number>; // type = string

let varB : StringNumberSwitch<string>; // type = number

/**
 * 제네릭 + 조건부 타입 + 함수 오버로딩은 타입스크립트가 입력 타입에 따라 반환 타입을 다르게 보이게 만드는 대표 패턴이다. 
 * 목표: 문자열이면 string 반환 , 아니면 undefined 반환을 타입으로 표현
 * 런타임 로직은 명확하다. 
 *  - text가 문자열이면 공백 제거한 문자열 반환
 *  - 아니면 undefined 반환
 * 문제는 타입 레벨에서 이 규칙을 정확히 표현하는 ㅂ아식이다.
 *  - 단순히 removeSpaces(text:any):any 로 두면 타입 안정성이 사라지고 removeSpaces(text: unknown): string | undefined로 두면 문자열 넣었을 때는 string이라는 정보를 잃는다.
 * 그래서 입력 타입에 따라 반환 타입을 달리 보이게 해야 한다.
 * 
 * 오버로딩이 왜 필요한가?
 * Typescript 함수 오버로딩은 보통 이렇게 구성된다.
 *  - 오버로드 시그니처(타입 선언부): 호출자가 보는 타입 규칙
 *  - 구현 시그니처(실제 함수 body): 런타임 구현 (보통 broad 타입 사용)
 *  - 핵심 원칙
 *    - 호출시 타입 체크는 오버로드 시그니처 기준으로만 한다.
 *    - 구현부의 any는 호출자에게 노출되지 않는다.
 *    -> 오버로드 시그니처와 구현 시그니처가 분리된다.
 *  호출 시점에 어떤일이 일어나는가?
 *  1. "hi hello bye"(문자열 리터럴)이 들어옴
 *  2. 제네릭 T는 보통 string으로 추론됨 (리터럴 -> string)
 *  3. 반환 타입 계산: T extends string ? string : undefined
 *     - string extends string -> 참
 *     - 결과: string (확정)
 */
function removeSpaces<T>(text: T): T extends string ? string : undefined;
function removeSpaces(text:unknown) {
  if(typeof text === 'string'){
    return text.replaceAll(" ","");
  }
  return undefined;
}

let result = removeSpaces("hi hello bye");
result.toUpperCase();

let result2 = removeSpaces(undefined);


/**
 * function removeSpaces<T>(text: T): T extends string ? string : undefined {
    if (typeof text === "string") {
      return text.replaceAll(" ", "") as any;
    }
    return undefined as any;
  }
  위와 같이 분리하지 않고 작성하는 경우 구현부에서 TS가 반환 타입을 완벽히 증명하지 못하는 문제가 생긴다.
  - 제네릭 T는 런타임에 확정되지 않음
  - typeof text === "string" 체크는 런타임 분기
  - TS가 "이 분기에서는 반환 타입이 정확히 조건부 타입과 일치한다"를 깔끔하게 추론 못하는 경우가 많음
  그래서 흔히
  - 오버로드 시그니처로 호출자에게 정확한 타입 제공
  - 구현부는 any/unknown 등 넓은 타입으로 런타임 구현을 단순화
  하는 패턴을 사용한다.
 */