// void -> 아무것도 없음을 의미 

// void를 사용하는 경우 = 반환값(return)이 없는 함수를 void 타입으로 명시함
function func1(): void {}


// never : 존재하지 않는, 불가능한 타입 (모순을 의미)
// never를 사용하는 경우 = 에러케이스를 예외처리할 때
function func2(): never {
  throw new Error();
}