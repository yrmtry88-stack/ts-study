/**
 * 타입 좁히기
 * 조건문 등을 이용해 넓은 타입에서 좋은 타입으로 타입을 상황에 따라 좁히는 방법
 */

type Person = {
  name: string;
  age: number;
}
// value => number: toFixed
// value => string : toUpperCase
function func(value: number | string | Date | null | Person) {
  // 타입을 좁히지 않은 상태에서는 메서드를 사용하면 에러남
  value; // number | string 타입 >> number 메서드나 string 메서드를 사용할 수 없음.

  // 타입을 좁혀서 타입을 보장한 다음에 해당하는 타입의 메서드를 사용할 수 있음
  // 타입을 좁히는 조건들은 "타입 가드(type guard)" 역할을 함.
  if(typeof value === "number"){
    console.log(value.toFixed());
  }else if(typeof value === "string"){
    console.log(value.toUpperCase());
  }else if (value instanceof Date){
    // typeof로 object인지를 체크하면 object타입인 null | Date의 타입이 되므로 타입이 확정되지 못한다. 
    // 따라서 object를 판별할 때는 어떤 값이 특정 클래스(생성자 함수)의 인스턴스인지를 판별하는 instanceof 연산자를 사용한다.
    /**
     * value instanceof Date 이 판별식은 "value가 Date 객체인가?"라기보다는 정확히 "value의 프로토타입 체인(prototype chain)에 Date.prototype이 존재하는지"를 검사한다. 
    */ 
    console.log(value.getTime());
   
  }
  else if(value && "age" in value) {
    /**
     * Person은 타입 선언일 뿐이라 런타임에 존재하지 않는다. 그래서 value instanceof Person 같은 검사는 불가능하다. 
     * 따라서 value && "age" in value 타입가드를 통해 
     * value가 null이 아니고 value 안에 "age"라는 프로퍼티가 존재하면 이 블록 안에서 TypeScript 는 value를 Person일 가능성이 높은 타입으로 좁혀주도록 한다.
    */ 
   console.log(`${value.name}은 ${value.age}살 입니다`);
  }
}