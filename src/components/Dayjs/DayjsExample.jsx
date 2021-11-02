import React, { useRef, useState } from 'react'
import dayjs from "dayjs";
import "dayjs/locale/ko";

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);

/*
모멘트는 최근 트렌드를 따라가지 못한다. 
사이즈가 리액트보다 훨씬 더 큰 문제점이 있고, 사이즈축소 알고리즘을 만족하지 않는다.
새로운 기능을 만들지 않겠다.
immutable하지않고, mutable하므로 문제가 있다. 
2011년에 Date라이브러리 선두였으나 도태 (Tree shanking X)
*/
export default function DayjsExample() {
  const birthDayRef = useRef(null);
  const [day, setDay] = useState("");
  const handleBirthDayChange = (event) => {
    setDay(dayjs(event.target.value, "YYYY-MM-DD").format("dddd"));
  }

  const dayjsDate = dayjs();
  const newDayjsDate = dayjsDate.add(1, "week");
  const cloneNewDayjsDate = newDayjsDate.clone().add(1, "week");
  return (
    <div>
      <h1>Day.js</h1>
      <div>Immutable Check</div>
      <div>
        {dayjsDate.format()}
        <br />
        {newDayjsDate.format()} 
        <br />
        {cloneNewDayjsDate.format()}
      </div>
      <br />
      <div>Summer Time (New York)</div>
      {/* timezone guess써서 어디시간인지 예측 */}
      <div>{dayjs.tz.guess()}</div> 
      <div>
        2018년 3월 10일 13시에 하루 더하기:
        {dayjs.tz("2018-03-10 13:00:00", "America/New_York").add(1, "day").format()}
      </div>
      <div>
        2018년 3월 10일 13시에 24시간 더하기:
        {dayjs.tz("2018-03-10 13:00:00", "America/New_York").add(24, "hour").format()}
      </div>
      <br />
      <div>Leap Year (Korea)</div>
      <div>
        {/* 2월이 29일이었을 때. */}
        2017년 1월 1일 1년 빼기:
        {dayjs("2017-01-01").subtract(1, "year").format()}
      </div>
      <div>
        2017년 1월 1일에 365일 빼기:
        {dayjs("2017-01-01").subtract(365, "day").format()}
      </div>
      <br />
      <div>
        한국어로 표기(07-17-2021을 2021년 7월 17일로 표기)
      </div>
      <div>{dayjs("07-17-2021").format("YYYY년 M월 D일")}</div>
      <br />
      <div>
        <input type="date" ref={birthDayRef} onChange={handleBirthDayChange} />
        <div>무슨 요일이었을까?</div>
        <div>{day}</div>
      </div>
      <br />
      <div>두 날짜 비교</div>
      <div>2021-07-17 03:00 와 2021-07-18 02:00는 몇시간 차이인가?</div>
      {/* 차이 */}
      <div>{`${dayjs("2021-07-17 03:00").diff(dayjs("2021-07-18 02:00"), "hours")}시간`}</div>
    </div>
  );
}

