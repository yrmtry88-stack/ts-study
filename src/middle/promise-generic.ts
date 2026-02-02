/**
 * 프로미스
 */
const promise = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve(20); // 여기서 20은 number 타입으로 추론되지 않고 unknown 타입으로 추론한다.
  },3000)
});

promise.then((response)=>{
  console.log(response); 
  // 20  -> response는 숫자 20이지만 unknown 타입이므로 연산을 추가할 수 없다. 
  // ex. console.log(response * 10) >> 에러
});
// 제네릭을 명시하지 않은 Promise는 resolve 값의 타입이 안전하게 잡히지 않기 때문에 연산이 어렵거나 안전하지 않다. 
/** 
 * 프로미스를 제네릭으로 작성하기
 */
// 
const promise1 = new Promise<number>((resolve, reject)=>{
  setTimeout(()=>{
    resolve(20); // number 타입만 resolve로 전달할 수 있음.
    //reject("에러 발생!!"); 
    // 자바스크립트에서 throw/reject는 아무 값이나 던질 수 있다.
    // 그래서 TypeScript는 catch(err)에서 err 타입을 자동으로 강하게 확정하기 어렵기 때문에 any로 설정된다. 
    // 추가로 TS에서는 useUnknownInCatchVariables 옵션에 따라 catch 변수 타입이 unknown이 되기도 한다.
    // 따라서 reject / catch 쪽은 타입이 안전하지 않으니, 타입 가드로 좁혀서 쓰는 습관이 필요하다.
  },3000)
})
promise1.then((response)=>{
  console.log(response * 30); // 600
});

promise1.catch((err)=>{
  if(typeof err === 'string'){
    console.log(err);
  }
})

/**
 * 프로미스를 반환하는 함수의 타입을 정의
 */

interface Post {
  id: number;
  title: string;
  content: string;
}

function fetchPost(): Promise<Post>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve({
        id:1, 
        title: "타이틀1",
        content:"컨텐츠 1"
      })
    }, 3000);
  });
}

const postRequest = fetchPost();
postRequest.then((post)=>{
  console.log(post.id)
})

/**
 * 프로미스를 그냥 만들면(제네릭 생략) -> new Promise(...)에서 resolve로 전달되는 값의 타입을 제네릭으로 지정하지 않으면, TypeScript는 그 값을 안전하게 추론하기 어렵다.
 * 그래서 .then()에서 받은 값은 unknown(또는 any 유사)처럼 동작할 수 있고, 숫자 연산 같은 작업을 바로 수행할 수 없다.
 * 
 * Promise에 <number> 제네릭을 붙이면 -> new Promise<number>(...) 처럼 제네릭을 명시하면, resolve로 전달되는 값은 반드시 number 여야 한다.
 * 그 결과 .then()에서 받는 값도 number로 확정되어 안전하게 연산이 가능하다.
 * 
 * reject/catch 는 타입 좁히기 필요
 * reject()로 전달되는 값은 어떤 타입이든 가능하므로, .catch()에서는 typeof/instanceof 등을 이용해 타입을 좁힌 뒤 처리해야 안전하다.
 */