/**
 * 서로소 유니온 (Discriminated Union)
 * 공통 식별자(tag)를 통해 유니온 타입을 안전하게 좁힐 수 있는 패턴
 */

type Admin = {
  tag:"ADMIN",
  name: string;
  kickCount: number;
};

type Member = {
  tag:"MEMBER",
  name: string;
  point: number;
};

type Guest = {
  tag:"GUEST",
  name: string;
  visitCount: number;
};

type User = Admin | Member | Guest;

// 어떤 타입인지 직관적으로 알수 없다. > tag를 추가하여 고유한 값으로 판별
// function login(user: User){
//   if('kickCount' in user){
//     console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다.`)
//   }else if('point' in user){
//     console.log(`${user.name}님 현재까지 ${user.point}를 모았습니다.`)
//   }else if('visitCount' in user){
//     console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다.`);
//   }
// }

function login(user: User){
  if(user.tag==='ADMIN'){
    console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다.`)
  }else if(user.tag=== 'MEMBER'){
    console.log(`${user.name}님 현재까지 ${user.point}를 모았습니다.`)
  }else if(user.tag==='GUEST'){
    console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다.`);
  }

  // ✨ switch 문으로 더 직관적으로 표현할 수 있다.
  switch (user.tag) {
    case "ADMIN": {
        console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다.`);
        break;
      }
    case "MEMBER": {
        console.log(`${user.name}님 현재까지 ${user.point}를 모았습니다.`);
        break;
      }
    case "GUEST": {
        console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다.`);
        break;
      }
    default:
      // 여기까지 오면 타입이 이상한 상태
      // (TS 설정이 엄격하면 user가 never로 좁혀져서 여긴 도달 불가)
      const _exhaustiveCheck: never = user;
      return _exhaustiveCheck;
  }
}
// tag가 서로 겹치지 않는 리터럴 타입이기 때문에 User는 서로소 유니온이 되고, switch(user.tag)로 안전하게 타입을 좁혀 각 타입 전용 프로퍼티를 사용할 수 있다.


/**
 * 사용 예
 */
// 비동기 작업의 결과를 처리하는 객체

 // 옵셔널 체이닝을 사용하는 것은 안전하진 않다. 따라서 서로소 유니온으로 만들어보자
// type AsyncTask = {
//   state: "LOADING" | "FAILED" | "SUCCESS";
//   error?: {
//     message :string;
//   };
//   response?:{
//     data: string;
//   }
// }
type LoadingTask = {
  state: "LOADING"
}
type FailedTask = {
  state: "FAILED",
  error: {
    message : string;
  }
}
type SuccessTask = {
  state : "SUCCESS",
  response: {
    data: string;
  }
}
type AsyncTask = LoadingTask | FailedTask | SuccessTask;
// 로딩중 -> 콘솔에 로딩중 출력
// 실패 -> 실패 : 에러메시지를 출력
// 성공 -> 성공 : 데이터를 출력
function processResult(task:AsyncTask){
  switch(task.state) {
    case "LOADING": {
      console.log("로딩 중");
      break;
    }
    case "FAILED":{
      // 서로소 유니온이 아닌 주석걸리 AsyncTask를 적용하면 옵셔널 체이닝을 사용하지 않을 때 에러가 발생한다.
      // 서로소 유니온으로 타입을 나누어 작성하면 옵셔널 체이닝을 사용하지 않아도 된다.
      console.log(`에러 발생: ${task.error.message}`);
      break;
    }
    case "SUCCESS": {
      console.log(`성공: ${task.response.data}`);
      break;
    }
  }
}
const loading :AsyncTask = {
  state: "LOADING",
};
const failed:AsyncTask = {
  state: "FAILED",
  error: {
    message: "오류 발생 원인은 ~~"
  }
};
const success:AsyncTask = {
  state: "SUCCESS",
  response: {
    data: "데이터~~"
  }
}

/**
 * 타입을 나누어서 서로소 유니온으로 타입을 정의하는 것과 타입 하나에 프로퍼티로 상태를 정의하는 것의 차이
 * "데이터 모델링을 상태별로 분해해서 타입이 보장하느냐" vs "한 타입에 옵션 프로퍼티로 뭉쳐서 런타임 체크(혹은 ?.)에 기대느냐"의 차이
 * 1) 한 타입 + optional 프로퍼티 방식의 성격
 *  이 구조의 문제는 타입 시스템 입장에서 아래와 같이 해석된다는 점이다.
 *    - state === "FAILED" 여도 error는 ?라서 있을수도/없을수도 있음
 *    - state === "SUCCESS" 여도  response는 ?라서 있을수도/없을수도 있음.
 * 즉, state와 error/response 사이의 "연관 규칙"을 타입이 강제하지 못한다.
 * 이 말은 error가 undefined일 가능성이 있기 때문에 옵셔널 체이닝 연산자가 필수가 된다는 의미이다.
 * 
 * 2) 서로소 유니온 방식의 성격
 *  반면 상태별로 타입을 나누면, 여기서는 state가 식별자가 되어 분기문 안에서 타입이 "확정"된다.
 *  따라서 task.error.message; 문장에서 error가 "필수"로 보장되므로 옵셔널 체이닝 연산자를 사용하지 않아도 된다.
 *  이게 TypeScript 가 "discriminated unions"로 공식 소개하는 대표 패턴이다.
 * 
 * 3) "옵셔널 체이닝을 안쓰면 왜 좋은가?" > 정확히는 "남용을 피하면 좋다."
 *   ?. 자체가 나쁜 기능은 아니지만 위의 예제에서 ?. 를 남발하면 문제가 생긴다.
 *    #1 버그를 숨길 수 있음 
 *     - ?. 는 중간이 null/undefined면 즉시 undefined를 반환하고 끝낸다.
 *     - 즉 위의 예제에서 FAILED인데 error가 없는건 데이터 불일치(버그)일 가능성이 큰데, ?.를 쓰면 그 버그가 크래시도 안나고, 컴파일 에러도 약해지고, 그냥 조용히 넘어갈 수 있다.
 *     - 서로소 유니온은 이런 불일치를 "타입 단계에서" 막이준다. (= 애초에 FAILED면 error 필수).
 *    #2 분기처리를 강제(혹은 유도)해서 누락이 줄어듦
 *     - 서로소 유니온 + switch는 케이스를 빠뜨리면 never로 잡아내는 패턴까지 연결되기 쉽다. 
 *     - 반면, optional 프로퍼티 + ?. 는 "없으면 undefined" 로 흐르기 쉬워서 실패/로딩 케이스 처리 누락이 생긴다.
 *    #3 "옵셔널 체이닝은 narrowing(타입좁히기)" 도구가 아니다.
 *     - ?. 는 안전한 접근을 위한 문법이지, 유니온을 좁혀주진 않는다. 
 * 4) 언제 어떤 방식을 사용하면 좋은가?
 *   - 서로소 유니온이 특히 좋은 경우
 *      - state(혹은 tag)에 따라 필드 존재 여부가 결정되는 모델
 *      - "이 상태면 반드시 이 데이터가 있어야 한다"를 타입으로 강제하고 싶을 때
 *        -> TS가 권장하는 전형적인 서로소 유니온 사용처
 *   - 한타입 + optional이 더 나은 경우
 *      - 실제로 error가 "있을 수도 있고 없을 수도" 있는 게 정상 스펙일 때
 *      - 상태/필드의 연관 규칙이 느슨하고, 런타임에서 결측을 자연스럽게 허용해야할 때
 *        -> 이때 ?. 는 유효한 선택이다.("없으면 그냥 없음"이 의도인 경우)
 */