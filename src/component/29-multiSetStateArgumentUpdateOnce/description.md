업데이트가 두번 되기는 할 것인데

number랑

this.state.number랑

해당 컨텍스트에서 값이 정해져 있다.

업데이트는 두번 일어나지만

this.setState로 넘어가는 값은 reference가 아니라 copy로 넘어간다고 봐야 한다.

copy 되었기 때문에 첫번째 업데이트가 일어나고 두번째 업데이트가 일어나도
변경된 변수가 아닌 기억되어 있는 copy값으로 업데이트하기 때문에

업데이트가 마치 한번만 일어난 것 처럼 보이게 하는 것으로 생각 된다.