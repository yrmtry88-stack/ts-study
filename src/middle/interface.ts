/**
 * 인터페이스 : 타입에 이름을 지어주는 또 다른 문법
 * + 객체의 구조를 정의하는데 트고하된 문법 (상속, 합침 등의 특수한 기능을 제공함)
 * 인터페이스에서는 유니온 타입으로 만들수는 없다. 
 */

interface Person {
  readonly name:  string; // 읽기 전용 프로퍼티
  age?: number;
  // 오버로딩을 구현하고 싶을 때는 호출 시그니처로 사용
  sayHi():void;
  sayHi(a:number, b:number): void;
}

const person : Person = {
  name: "yoora",
  age: 20,
  sayHi: function(){
    console.log("Hi");
  }
}

// 인터페이스의 확장1(상속 개념)
interface Animal {
  name: string;
  color: string;
}
interface Dog extends Animal {
  isBark: boolean;
}
interface Cat extends Animal {
  name:"야옹이"; //기존 선언된 타입(string)의 서브타입으로만 오버로딩 할 수 있다. 
  isCute:boolean;
}
interface Chicken extends Animal {
  isFly:boolean;
}
const dog: Dog = {
  name: '초코',
  color: '브라운',
  isBark: true
}
const cat: Cat = {
  name: "야옹이",
  color:'yellow',
  isCute:true
}

// 인터페이스 확장2 (다중 확장)
interface DogChicken extends Dog, Chicken {}

const dogChicken : DogChicken = {
  name: "",
  color: "",
  isBark: true,
  isFly: false
}

// 선언합침 : 인터페이스 합치기 
// 인터페이스는 중복선언이 가능하고, 최종적으로 프로퍼티가 모두 합쳐진것이 적용됨

interface Person1 {
  name: string;
}
interface Person1 {
  // name:number; "동일한 타입" 으로만 재작성 가능함 (서브타입도 에러남)
  age:number;
}

const person1 : Person1 = {
  name: '',
  age:1
}

/**
 * 모듈 보강 : 라이브러리 사용시 기존의 선언에 프로퍼티 타입을 추가 선언할 수 있다.
 */
// 라이브러리에 정의되어있지만 추가 프로퍼티 정의가 필요한 상황
interface Lib {
  a:number;
  b:number;
}
// 프로젝트에서 추가로 프로퍼티를 추가 선언
// 인터페이스가 합쳐져서 a,b,c 프로퍼티가 모두 정의되어야 하는 Lib 타입이 됨.
interface Lib {
  c: string;
}
const lib: Lib = {
  a:1, 
  b:2,
  c: "hello"
}