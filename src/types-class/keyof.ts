/**
 * keyof 연산자
 */
/**
 * keyof 연산자
 * 어떤 타입의 "키 이름들"만 뽑아서 유니온 타입으로 만든다. 
 * 그래서 함수 인자로 key를 받을 때 "name" 또는 "age"만 받게 만들 수 있다. 
 * keyof는 "값"이 아니라 타입을 대상으로 동작한다.
 */
interface Person {
  name: string;
  age: number;
}

function getPropertyKey(person: Person, key: keyof Person){ // keyof는 프로퍼티를 모두 유니온타입으로 추출한다. keyof 연산자는 꼭 타입에만 사용할 수 있다.
  return person[key];
}

const person: Person = {
  name: "yr",
  age:1
}
getPropertyKey(person, "name");


/**
 * typeof (TypeScript에서의 typeof)
 * JS typeof와 이름은 같지만, TS에서는 값에서 타입을 뽑아오는 용도로 자주 사용한다.
 * 즉, "이미 만들어진 객체/변수"에서 타입을 자동으로 생성할 수 있음.
 */
// 변수에서 정의한 객체를 프로퍼티로 우회하여? 타입을 설정할 수 있다.
const person3 ={
  name: "yr",
  age:1,
  address:"seoul"
}
type Person10 = typeof person3; // Person10의 타입이 person2의 프로퍼티와 프로퍼티의 타입을 추론하여 지정됨.
// typeof person3를 사용하는 이유
// keyof는 타입에만 쓸수 있고, person3은 값(변수)이므로 -> 먼저 typeof person3로 타입으로 바꾼 뒤 -> keyof로 키 유니온을 뽑는 흐름이다.

function getPropertyKey2(person2: Person10, key: keyof typeof person3){ // keyof 다음에 Person10 타입을 명시하거나, Person10 타입을 명시할 때 추론하도록한 객체를 typeof로 명시해도 동일하게 동작한다.
  return person2[key];
}

getPropertyKey2(person3, "address");

/**
 * typeof로 우회하여 타입을 사용하는 이유
 * "type을 직접 쓰면 되는 상황"도 많지만, typeof 변수 -> 타입 추출 순서로 사용하는 이유는 값(실제 데이터)을 "단일 진실(Single Source of Truth)"로 두고 
 * 타입을 자동으로 따라가게 만들기 위해서이다. 
 * 즉, 타입을 따로 관리하는 비용/ 리스크를 줄이려고 사용한다.
 * 또한 typeof를 "타입 뽑기 용도"로 쓰는 경우는 그 변수가 타입의 기준(원천) 역할을 해야하므로, 사실상 유일한 기준(SSOT, Single Source of Truth)이어야 설계가 깔끔해진다.
 * 다만 "반드시 1개 변수만 존재해야 한다"기 보다는 기준이 되는 값이 하나로 정해져 있어야 한다는게 핵심이다.
 * 값이 기준이어야 하는 영역 기준 => 실무 
 *  - 라우트 상수
 *  - 이벤트명 상수
 *  - 권한/롤 상수
 *  - 테마 토큰 
 *  - i18n 키 목록
 *  - 상태 머신 상수 등
 */