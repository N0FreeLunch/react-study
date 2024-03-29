## 만들고자 하는 것
- 화면의 `input component number` 부분에 수치를 입력하고 move 버튼을 입력하면, 입력한 값 대로 `current component number : ` 부분의 값이 변화되도록 만드는 것이 목적이다.
- 이렇게 하기 위해서는 move 버튼을 누를 때 `componentNumber` 변수가 input 태그에 입력한 값으로 변경이 되어야 한다.

### move 버튼을 누를 때
- move 버튼을 누르면 `current component number : ` 부분에 `componentNumber` 변수가 나타나야 한다.
- 리액트에서 변수를 화면에 출력하기 위해서는 컴포넌트 함수를 다시 실행해서 JSX의 태그를 화면에 새로 그려줘야 한다.
- 컴포넌트 함수를 다시 실행하기 위해서는 상태 변경 함수를 실행 시켜 줘야 한다. 따라서 `setComponenttNumber`라는 상태 변경 함수에 input에 입력된 값을 전달하면 되는 것이다.
```js
  const move = (e) => {
    setComponentNumber(인풋_태그_값);
  }
```
- 위와 같은 코드로 만들면 move 버튼을 눌렀을 때 move 함수가 실행되고 상태 변경 함수 `setComponentNumber`가 호출되어 컴포넌트 함수가 새로 실행되면서 `componentNumber` 변수의 값이 `인풋_태그_값`이 되는 것이다.

### input 태그의 값을 가져오는 방법
- HTML의 태그에는 값이란 것이 있다. 일반적으로 태그의 값은 `value` 속성을 통해서 정의할 수 있다.

HTML의 경우
```html
<input type='number' value=33></input>
```
- 태그의 value 속성을 통해서 값을 정의할 수있다.
- 위와 같이 태그를 HTML 도큐먼트에 넣게 되면, 브라우저 화면의 input 태그의 박스에는 기본적으로 33의 값이 들어가게 된다.
- input 태그 안의 값을 바꾸어도 이미 브라우저에 로드 된 value 속성의 값은 33이다.
- 자바스크립트로 위의 태그를 선택해서 value 값을 바꾸게 되면 브라우저에 이미 로드된 태그의 속성 값은 여전히 33으로 변경되지 않지만, 자바스크립트에서의 태그(Node 객체)는 값이 바뀌게 된다.

JS의 경우
```js
const inputTag = document.querySelector("input[type='number']");
console.log(inputTag.value); // input 태그의 값을 알고 싶을 때
inputTag.value = 20; // input 태그의 값을 변경할 때
```
- `inputTag`은 자바스크립트 상에서 태그를 선택한 대상이며, Node 객체 또는 Element 객체라고 부른다. (Node 객체는 태그 간의 구조적인 특성을 다루기위한 것이며, Element 객체는 태그의 속성을 다루기 위한 것이다. 여기서는 속성을 위주로 다루므로 Element 객체로 부르도록 한다.)
- 만약 위의 HTML 태그(`<input type='number' value=33></input>`)가 브라우저에 로딩이 된 상태에서 `inputTag`라는 Element 객체의 value 값은 태그가 가지고 있는 value 속성 값을 가지고 있다.
- 만약 `inputTag.value = 20`와 같이 Element 객체의 value 프로퍼티 값을 변경해 준다면 `<input type='number' value=33></input>`의 value 속성의 값은 변경되지 않지만 Element 객체가 가진 value 값은 20으로 변경이 된다.

React의 경우
```js
// ...

let inputValue = 0;

const changeInputValue = (e) => {
  inputValue = parseInt(e.target.value);
}

function App () {
  // ...

  const move = (e) => {
    console.log(inputValue);
    alert(inputValue);
  }

  // ...

  return (
    // ...
    <div style={style.inputTitle}>
      <div>input component number</div>
      <input type='number' style={style.input} onChange={changeInputValue}></input>
      <button type='button' onClick={move}>move</button>
    </div>
    // ...
  );
}
```
- 인풋 태그에 값을 입력할 때마다 실행하는 이벤트를 달 수 있다. 이벤트의 종류는 많지만 input, textarea 등의 요소에서 사용자의 입력값이 바뀔 때 마다 지정한 함수를 실행하는 이벤트는 `onChange` 이벤트이다. input 태그에 넣은 값을 자바스크립트 변수에 저장할 수 있도록 함수를 실행해야 하므로 `onChange` 이벤트를 사용한다.
- `onChange={changeInputValue}`를 보면 `onChange` 이벤트로 `changeInputValue` 함수를 지정한 것을 확인할 수 있다.
- `changeInputValue` 함수는 컴포넌트 함수 `App`의 스코프 외부에 위치하였는데, 리액트의 상태 변수의 변경과 관련이 없는 함수이며, 컴포넌트 함수를 재시작 할 때마다 로딩할 필요가 없는 함수이기 때문에 컴포넌트 함수 외부에 위치시켰다. 컴포넌트 함수 안에 있으면 리액트의 상태 변경 함수로 상태를 변경할 때 마다 컴포넌트 함수가 실행되기 때문에 컴퓨터가 사용하는 리소스(CPU나 메모리의 사용량)이 많아진다. 물론 이 차이는 무시해도 되므로 컴포넌트 함수 안에 `changeInputValue` 함수를 정의해도 대개의 경우 무방하다.
- 리액트의 상태 변경을 하는 이유는 화면에 태그를 새로 다시 그려야 할 때 사용한다. `input` 태그에 값을 입력하는 것은 태그를 새로 그릴 필요가 없으며, 한 번 화면에 태그가 그려졌다면 다시 태그를 그리지 않아도 값을 입력할 때 화면에 입력한 값이 나올 수 있도록 브라우저가 기능을 제공한다. 만약 브라우저가 지원하는 기능이 아니었다면 하나의 글자의 변경이 있을 때 마다 `input` 태그가 들어 있는 컴포넌트 함수를 새로 실행하기 위해서 상태 변경 함수의 변수를 변경하는 방식으로 만들어야 할 것이다.
- `inputValue` 변수도 컴포넌트 함수 스코프 밖에 위치해 있는데, 함수 스코프 밖에 있기 때문에 `App` 컴포넌트가 처음 로딩이 될 때 변수가 선언이 되어 특별히 조작을 하지 않는 한 브라우저를 종료하거나 새로고침을 하기 전까지 계속 존재하는 변수이다. 물론 이 변수는 컴포넌트 컴포넌트 함수를 정의한 JS 파일 범위에서만 사용할 수 있지만, 컴포넌트 함수 스코프 외부에 정의되어 있어서 컴포넌트 함수를 반복적으로 실행해도 `inputValue` 변수는 초기화 되지 않고 계속 사용할 수 있기 때문에 컴포넌트 함수의 값의 저장소로 쓰기에 좋다.

#### 안티패턴
> 실제 많이 사용되는 패턴이지만 비효율적이거나 비생산적인 패턴을 의미한다. (wikipedia)
- 이 부분은 설명이 장황하기 때문에 일단은 스킵을 해도 된다. 컴포넌트 함수 외부 스코프의 변수에 변경사항을 저장하는 것 보다는 `useState`나 `useRef`등을 사용한 방식으로 만드는 것이 권장된다.
- 리액트에서 컴포넌트 함수 외부에 변경가능한 변수를 선언하는 것은 안티패턴으로 여겨진다. 안티패턴은 좋지 않은 방식의 사용이므로 가능한 사용을 하지 마라는 방식을 의미한다.
- 안티패턴인 이유 : 리액트에서는 하나의 컴포넌트 파일을 로드해서 여러 부분에서 컴포넌트 함수를 가져다 쓸 수 있어서 서로 다른 부분에서 사용한 컴포넌트 함수에서 변수에 저장한 값이 서로 공유 되는 경우가 생길 수 있다.
- 예를 들어 5지선다의 시험 문제를 여럿 내는 리액트의 경우, 5지 선다 컴포넌트를 만들고 이를 문제마다 반복하여 사용해서 시험 문제 화면을 만들 수 있다. 하나의 컴포넌트 파일을 로드를 한 이후에 여러 문제에 이 5지 선다 컴포넌트를 사용한다고 하고, 5지 선다 중에서 하나를 선택을 하면 내부의 변수값이 5개의 답안 중에 하나의 번호를 선택하는 경우를 생각해 볼 수 있다. 만약 컴포넌트 함수 외부에 변수를 선언을 해 주었고 이 변수에 사용자가 선택한 답의 번호를 저장한다고 하자. 이 변수의 이름을 `answerNumber`라고 하면 1번 문제에서 3번의 답을 선택해서 `answerNumber`이란 변수에 3을 저장하고 2번 문제에서 4번의 답을 선택해서 `answerNumber`에 4를 저장을 하게 되면, 1번 문제를 풀로 저장한 변수는 2번 문제에서 선택한 답에 의해 사라지게 되는 문제가 생긴다.
- 컴포넌트 함수 외부에 선언한 변수는 여러 곳에서 사용되는 컴포넌트 함수 모두에 공유가 된다. 어떤 컴포넌트를 로딩한 이후에 이 컴포넌트를 한 곳에서 사용을 하고 다른 곳에서 동일한 컴포넌트를 사용하는 경우, 한 곳에서 변경한 컴포넌트의 변수값이 다른 곳에서 변경한 컴포넌트의 변수값과 공유가 되면서 각각의 컴포넌트의 변수가 독립적으로 동작하지 않고 공유가 되는 경우가 생길 수 있다.
- 리액트에서는 컴포넌트란 개념을 한 번만 사용을 하는 것 뿐만 아니라, 한 번 로드한 이후 반복적으로 컴포넌트를 사용할 수 있다고 기대한다. 따라서 서로 다른 곳에서 사용한 컴포넌트의 변수가 서로 공유가 되는 경우가 생길 수 있고, 변수가 공유되면 예기치 않은 동작을 일으키므로 버그가 발생할 가능성이 높다. 그래서 컴포넌트가 로드된 이후 로드된 컴포넌트를 한 번만 사용하는 목적으로 만들었다고 하더라도 컴포넌트라는 대상이 반복적으로 사용할 것을 기대하는 것으로 인식이 되기 때문에 잘못 사용될 가능성이 있어서 이렇게 구현하지 않는 편이 좋다.
- 컴포넌트 함수 내에 정의하면 컴포넌트 함수를 실행할 때마다 로딩이 되기 때문에 컴퓨터 자원을 상대적으로 많이 소비한다는 단점이 있다. 계속적인 변경이 이뤄지는 대상을 컴포넌트 함수 밖에 위치시키면 잘못된 사용될 수 있기 때문에 컴포넌트 함수 내에 배치하고, 변경이 이뤄지지 않는 대상은 컴포넌트 함수 밖에 위치시켜서 컴퓨터의 자원 소비를 최소화 하는 전략을 사용하는 것이 좋다.
- 컴포넌트 함수 밖에 정의하는 대상은 `const`를 사용하여 값을 바꿀 수 없게 하고, 오브젝트나 배열 등의 값인 경우에는 `const`를 사용해도 내부 값을 변경할 수 있기 때문에 `Object.freeze`를 사용하여 변경 불가능하게 만들어 주는 것이 좋다.
```js
const freezedObject = Object.freeze({
  // ...
});

function FunctionComponent () {
  return JSX;
}
```

### 전체 코드
```js
import { useState } from 'react';

let inputValue = 0;

const loadComponent = (<h1>로딩되는 리액트 컴포넌트</h1>);

const style = {
  numberDisplay : {
    marginLeft: '10px'
  },
  prevNextBtn : {
    marginLeft: '10px'
  },
  inputTitle : {
    marginLeft: '10px'
  },
  input : {
    width: '80px',
    marginRight: '20px',
    marginLeft: '10px'
  },
  componentLoadArea : {
    border: '1px solid black'
  }
};

const changeInputValue = (e) => {
  inputValue = parseInt(e.target.value);
}

function App() {
  const [componentNumber, setComponentNumber] = useState(10);

  const prev = () => {
    setComponentNumber(componentNumber-1);
  }
  
  const next = () => {
    setComponentNumber(componentNumber+1);
  }

  const move = (e) => {
    console.log(inputValue);
    alert(inputValue);
  }

  return (
    <div>
      <h3 style={style.numberDisplay}>current component number : {componentNumber}</h3>
      <div style={style.prevNextBtn}>
        <button onClick={prev}>prev</button>
        <button onClick={next}>next</button>
      </div>
      <br/><br/>
      <div style={style.inputTitle}>
        <div>input component number</div>
        <input type='number' style={style.input} onChange={changeInputValue}></input>
        <button type='button' onClick={move}>move</button>
      </div>
      <br/><br/><br/>
      <div style={style.componentLoadArea}>
        {loadComponent}
      </div>
    </div>
  );
}

export default App;
```