// number,  :number => 타입 주석 = annotation
let num1 = 123;
let num2 = -123;
let num3 = 0.123;
let num4 = -0.123;
let num5 = Infinity;
let num6 = -Infinity;
let num7 = NaN;
// string
let str1 = "hello";
let str2 = "hello";
let str3 = "hello";
let str4 = `hello ${num1}`;
// boolean
let bool1 = true;
let bool2 = false;
// null
let null1 = null;
// undefined
let unde1 = undefined;
// 리터럴(값) 타입
let numA = 10;
let strA = "hello";
let boolA = true;
// 배열
let numArr = [1, 2, 3];
let strArr = ["A", "B", "C"];
let boolArr = [true, false];
// 배열에 들어가는 요소들의 타입이 다양할 경우
let multiArr = [1, "hello"];
// 다차원 배열의 타입을 정의하는 방법
let doubleArr = [
    [1, 2, 3],
    [4, 5]
];
// 튜플 : 길이와 타입이 고정된 배열 => 별도로 존재하는 자료형이라고 볼수는 없음=> 배열임.
// 배열이기 때문에 배열의 메서드를 사용할 수 있지만, 길이와 타입이 고정되어있어 에러나기 쉬움
let tup1 = [1, 2];
let tup2 = [1, "2", true];
// 튜플을 사용하는 경우 : 자료형의 순서와 배열의 길이의 고정이 중요할 때,
const users = [
    ["yoora1", 1],
    ["yoora2", 2],
    ["yoora3", 3],
    ["yoora4", 4],
];
// 객체의 주석인 object는 객제인것 말고는 정보를 주지 않아서 사용하지 않는다.
// 객체의 주석은 객체 리터럴로 프로퍼티의 자료형까지 모두 주석을 명시해야 한다. (구조적 타입 시스템)
let user = {
    id: 1,
    name: "yoora"
};
let dog = {
    name: "돌돌이",
    color: "brown"
};
// 값이 수정되면 안되는 프로퍼티는 앞에 readonly를 붙여준다.
let config = {
    apiKey: "AAAAAA"
};
export {};
