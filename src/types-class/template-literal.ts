/**
 * 템플릿 리터럴 타입 : 문자열 리터럴 타입을 조합해서 새로운 문자열 타입을 "계산"해내는 타입 문법
 * JavaScript의 템플릿 리터럴문법 (`${a}-${b}`)을 타입 레벨에서 그대로 가져온 것이라고 보면된다. 
 * 요약: 템플릿 리터럴 타입은 "문자열인데, 규칙을 가진 값"을 타입 레벨에서 안전하게 표현하기 위한 도구다.
 */
// 기존 방식의 한계 -> 문자열을 그냥 string으로 쓰면
function setStyle(value: string){} // 문자열이면 다 됨 >> 의도한 형식의 문자열인지 타입 레벨에서 전혀 보장되지 않음

// 문자열 리터럴 유니온으로 "재료"를 만든다.
type Color = 'red' | "black" | "green";
type Animal = "dog" | "cat" | "chicken";

// 템플릿 리터럴 타입의 핵심 문법 - 다음 코드에서 타입스크립트가 내부적으로 하는일
// 1. Color의 모든 경우를 하나씩 꺼냄
// 2. Animal의 모든 경우를 하나씩 꺼냄
// 3. ${Color}-${Animal} 형태로 모든 조합을 생성
// 4. 그 결과를 문자열 리터럴 유니온 타입으로 만듦 -> (자동)
type ColoredAnimal = `${Color}-${Animal}`;

// 즉, ColoredAnimal 타입은
// type ColoredAnimal = "red-dog" | "red-cat" | "red-chicken" | "black-dog" | "black-cat" | "black-chicken" | "green-dog" | "green-cat" | "green-chicken";
// 가 된다.

// 템플릿 리터럴 타입을 사용하면 문자열이지만 완전히 통제된 값만 허용하여 오타/ 잘못된 조합을 컴파일 단계에서 차단함으로써 타입 안전성에 기여한다.