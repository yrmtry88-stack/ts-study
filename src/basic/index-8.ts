/**
 * 타입 단언
 * 초기화만 해두고 나중에 값을 할당하고 싶을 때 타입을 단언해둔다.
 */
type Person ={
  name: string;
  age: number;
};
// 타입 단언
let person = {} as Person;
person.name="yoora";
person.age = 11;

type Dog = {
  name: string;
  color: string;
}
// 프로퍼티를 추가하고 싶은데, 초과프로퍼티검사가 발동되는 상황일 때 타입단언으로 우회할 수 있다.
let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도"
} as Dog;

/**
 * 타입 단언의 규칙
 * 값 as 단언 <- 단언식
 * A as B
 * A가 B의 슈퍼타입이거나
 * A가 B의 서브타입이어야 함.
 */

let num1 = 10 as never;
let num2 = 10 as unknown;

// let num3 = 10 as string; -> 에러 : 두 형식이 겹치지 않기 떄문

// 타입 단언을 우회하여 다중단언.. 좋은 방법이 아님 > 타입스크립트를 사용할 이유가 없음
let num3 = 10 as unknown as string;

/**
 * const 단언
 */

// const 선언은 let을 const로 선언한것과 같은 효과가 있다.
let num4 = 10 as const;

// const로 단언하면 프로퍼티의 값을 수정할 수 없게됨
let cat = {
  name: "야옹이",
  color: "yellow"
} as const; 

/**
 * Non Null 단언
 */
type Post = {
  title: string;
  author?: string;
};

let post : Post ={
  title: "게시글1",
  author: "yoora"
}
// ?.는 에러가 남. string | undefined 중 undefined일 경우 undefined의 length가 없기 때문
// post에는 author 프로퍼티가 존재하므로 프로퍼티가 존재한다는 확정의 !. 연산자를 사용해볼 수 있음.
const len: number = post.author!.length;
