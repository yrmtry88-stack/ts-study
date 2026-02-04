/**
 * 분산적인 조건부 타입
 *
 * 조건부 타입에서 검사 대상이 "naked type parameter" (그냥 T)인 경우, 
 * T가 유니온이면 각 멤버에 대해 조건부 타입이 각각 적용된 뒤 다시 유니온으로 합쳐진다.
 * - (A | B | C)에 대해 => F<A> | F<B> | F<C>
 */
type StringNumberSwitch<T> = T extends number ? string : number;
let a: StringNumberSwitch<number>; // string
let b: StringNumberSwitch<string>; // number

// 분산적으로 동작
// StringNumberSwitch<number | string>
// = StringNumberSwitch<number> | StringNumberSwitch<string>
// = string | number
let c: StringNumberSwitch<number | string>; 

let d: StringNumberSwitch<boolean | number | string>;
// StringNumberSwitch<boolean> |     >> number
// StringNumberSwitch<number> |      >> string
// StringNumberSwitch<string>        >> number
// d의 타입은 string | number >> 유니온에서 중복은 합쳐짐

/**
 * 실용 예제 : Exclude
 * 
 * T의 각 멤버 중에서 U에 "할당 가능(= 포함/서브타입)" 한 멤버는 제거(never)
 * 나머지는 유지한다.
 * 
 * 즉, 유니온 필터링이다.
 */
// T 가 U의 서브타입이면 never, 아니면 T 타입
type Exclude1<T, U> = T extends U ? never : T;
type A = Exclude1<number | string | boolean, string>;
// 분산적용
// 1단계
// Exclude1<number, string> |
// Exclude1<string, string> | 
// Exclude1<boolean, string> 

// 2단계
// number |
// never |
// boolean

// A 의 타입은 number | never | boolean  >> 유니온에서 never는 "합쳐도 의미없는타입"이라 결과에서 사라지는것처럼 보인다.(유니온 단순화)
// 따라서 A의 타입은 number | boolean

type Extract1<T, U> = T extends U ? T : never;
type B = Extract1<number | string | boolean , string>;

// 1단계 
// Extract1<number, string> |
// Extract1<string, string> |
// Extract1<boolean, string>

// 2단계
// never | 
// string | 
// never 

// 결과
// string

/**
 * 분산하여 체크하지 못하게 하고 싶을 경우
 */
type StringNumberSwitch2<T> = [T] extends [number] ? string : number;
let e: StringNumberSwitch2<boolean | number | string>; // number
// 유니온 전체를 한번에 검사하는 형태가 되므로 <boolean | number | string>은 number의 서브타입이 아니기 때문에 거짓 결과값인 number 타입으로 지정된다.

