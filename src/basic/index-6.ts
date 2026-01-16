// 조건이 더 적은 Animal 타입이 슈퍼타입
type Animal = {
  name: string;
  color: string;
};

// 조건이 더 적은 Dog 타입이 서브 타입
type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: "기린",
  color: "yellow"
};

let dog: Dog ={
  name: "돌돌이",
  color: "brown",
  breed: "진도"
}

animal = dog;

// Book 은 슈퍼타입
type Book = {
  name: string;
  price:number;
}

// ProgrammingBook은 서브타입
type ProgrammingBook ={
  name: string;
  price: number;
  skill: string;
};

let book: Book;
let programmingBook: ProgrammingBook = {
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  skill: "reactjs"
}
book = programmingBook;

let book2: Book = {
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  // 객체 리터럴로 선언할 때는 타입에 선언되어있는 프로퍼티만 명시해야한다 -> 초과하면 안된다.
 // skill: "reactjs"
}

// 객체리터럴을 우회해서 선언할 경우에 초과 프로퍼티가 허용되는 경우
// Book의 프로퍼티에 없는 skill 프로퍼티가 객체 programmingBook을 할당함으로서 할당되었지만, 에러나지 않음
let book3: Book = programmingBook;

// 함수의 인수로 타입을 명시하여, 객체리터럴을 반환할 때도 프로퍼티를 초과할 수 없다.
function func(book: Book) {}
func({
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  // skill: "reactjs"
});
// 함수의 인수로 객체 programmingBook를 전달하면, 프로퍼티가 초과되었지만 에러나지 않음
func(programmingBook);

/*
  초과 프로퍼티 검사
  TypeScript는 구조적 타입 시스템이라서 "필요한 프로퍼티가 있으면(최소 요건 충족)" 대입이 가능하다.
  다만 객체 리터럴을 그 자리에서 바로 타입에 넣을때는, 실수 방지를 위해 "초과 프로퍼티 검사"라는 규칙을 특별히 적용한다.
  book = programmingBook; 이 가능한 이유는 Book이 요구하는 최소 요건을 만족하기 때문에 대입이 가능하다. 
  -> 이건 TypeScript의 구조적 타입 시스템(Structure Typing) 규칙이다.
  -> 이 타입이 저 타입의 하위 타입인지를 이름/상속이 아니라 프로퍼티 구조로 판단한다.

  그런데 객체 리터럴로 대입하려고 하면, TypeScript는 객체리터럴을 "fresh(신선한) 값"으로 보고, 
  이 값을 어떤 타입에 할당할 때 다음을 엄격하게 검사한다.
  -> "지금 선언한 타입(Book)에 없는 프로퍼티가 섞여 있으면, 오타/실수 가능성이 크다"
  -> 예를들어 skil 같은 오타, 잘못된 필드명을 잡아내기 위한 안전장치이다.
  -> 즉, 이건 "할당 불가능" 규칙이 아니라 객체 리터럴에만 추가로 붙는 "실수 방지용 검사"라고 보는게 정확하다.
  반대로, 이미 변수에 할당된 객체는 다른 곳에서 사용될 수 있으므로 검사하지 않는다.

  정리하면
  객체 리터럴 직접 할당 => "초과 프로퍼티 검사" 발생
  변수/표현식(이미 이름 붙은 값) 할당 : 기본 구조 검사만 발생, 초과 프로퍼티 검사가 적용되지 않는다.
  변수든 함수든 동일한 원리로 적용된다.
*/

// A. 초과 프로퍼티 검사를 "의도적으로" 통과시키는 패턴
const tmp1 = { name: "...", price: 33000, skill: "reactjs" };
let b: Book = tmp1; // OK

// B. Book을 만족하는지 검사하되, 추론 타입은 유지한다 (satisfies)
// : => 타입 고정
// satisfies => 타입 검증
const tmp2 = {
  name: "...",
  price: 33000,
  // skill: "reactjs",
} satisfies Book; // → Book을 만족하는지 검사하지만, 객체의 실제 타입 추론은 유지됨

// C. 정말로 추가 프로퍼티를 허용하고 싶다면(인덱스 시그니처)

type Book2 = {
  name: string;
  price: number;
  [key: string]: unknown; // 추가 프로퍼티 허용
}
// 초과 프로퍼티 허용 가능
// 단, 초과 프로퍼티 검사를 완전히 무력화하므로, 오타 검출 능력도 같이 사라지므로 신중히 사용
