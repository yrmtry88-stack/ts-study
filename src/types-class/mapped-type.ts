/**
 * 맵드 타입 : 맵드 타입 문법은 interface 본문에서 직접 사용할 수 없다. 
 * interface 자체가 맵드타입을 전혀 못쓴다는건 아니고, type으로 맵드 타입을 만든 뒤, 그 결과를 interface가 extends 하는 형태로는 가능하다. 
 * 맵드타입은 뭘하는가?
 *  - keyof User로 "id" | "name" | "age" 를 뽑고, [K in keyof User]로 그 키들을 한 번씩 순회하면서 새로운 타입을 만든다.
 */
// 맵드 타입으로 Partial/ Readonly 같은 파생 타입 만들기
interface User {
  id: number;
  name: string;
  age: number;
}
// PartialUser는 사실 표준 유틸리티 타입 Partial<User>와 동일
/**
 * Partial: 모든 프로퍼티를 optional로 만든다.
 * (= 표준 유틸리티 타입 Partial<User> 와 동일)
 */
type PartialUser ={
  [key in keyof User] ?: User[key];
};
/**
 * BooleanUser: 모든 프로퍼티 값을 boolean으로 바꾼다.
 */
type BooleanUser ={
  [key in keyof User] : boolean;
};
/**
 * ReadonlyUser: 모든 프로퍼티를 읽기 전용으로 만든다.
 * (= Readonly<User> 와 동일한 아이디어)
 */
type ReadonlyUser ={
  readonly [key in keyof User] : User[key];
};

// 한명의 유저 정보를 불러오는 기능
function fetchUser():User {
  //...기능
  return {
    id: 1, 
    name: 'yr',
    age: 1
  }
}

// 한명의 유저 정보를 수정하는 기능
function updateUser(user: PartialUser) {
  // 예: id만 오거나, name만 오거나, age만 와도 됨
  // ...수정하는 기능
}

updateUser({ age: 111 });      // OK
updateUser({ name: "yr" });    // OK
updateUser({ id: 1, age: 111 });  // OK