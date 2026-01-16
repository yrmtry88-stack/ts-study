// any : 특정 변수의 타입을 알 수 없을 때
// any 타입은 코드 작성 시점에서 문법을 검사하지 않는다.
// any 타입은 런타임 시점에서 문법 검사를 하기 때문에 타입스크립트 사용의 이점이 없다.
let anyVar:any = 10;
anyVar = "yr";
anyVar = ["array"];
anyVar = {id:1};
anyVar = null;
anyVar = undefined;
anyVar = ()=>{
  return console.log("함수");
};

let num: number = 10;
num = anyVar;
anyVar = num;

// unknown : 모든 값을 저장할 수 있지만, 모든 타입에 할당될 수 없다.
// 할당될 값의 타입을 알수 없을 땐, 런타임 에러를 발생시키는 any 타입보다는 unknown을 사용하는 것을 권장
let unKnownVar: unknown;
unKnownVar = "";
unKnownVar = () => {};
unKnownVar = 1;

// unknown 타입의 사용 : 타입을 정제하여 처리 가능
if (typeof unKnownVar === 'number'){
  num = unKnownVar;
}

console.log(num); // 1