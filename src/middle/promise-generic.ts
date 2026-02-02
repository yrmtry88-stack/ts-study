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

/** 
 * 프로미스를 제네릭으로 작성하기
 */
const promise1 = new Promise<number>((resolve, reject)=>{
  setTimeout(()=>{
    resolve(20); // number 타입만 resolve로 전달할 수 있음.
    //reject("에러 발생!!"); // reject는 any 타입으로 설정되어있기 때문에 catch 구문에서 타입을 조건문으로 좁혀서 상황에 맞게 출력한다.
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