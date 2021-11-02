import React, { useRef, useState } from 'react'
import  { add, format, sub, differenceInHours } from 'date-fns';
import addWeeks from 'date-fns/addWeeks';
import { format as timezoneFormat, toDate } from 'date-fns-tz';

// ko 값 가져오기
// import { ko } from "date-fns/locale" 
// 또는
import ko from "date-fns/locale/ko"; 


export default function DateFnsExample() {
  const birthDayRef = useRef(null);
  const [day, setDay] = useState("");
  const handleBirthDayChange = (event) => {
    setDay(format(new Date(event.target.value), "EEEE", { locale: ko }));
  }

  // 그냥 native date사용해라
  const dateFnsDate = new Date();
  const newDateFnsDate = add( dateFnsDate, { weeks: 1 });
  // 트리쉐이킹이 되기 떄문에 이렇게 필요한 addWeeks로 위의 add를 호출하면 더 효율적.
  const newDateFnsDate2 = addWeeks( newDateFnsDate, 1);
  return (
    <div>
      <h1>date-fns</h1>
      <div>Immutable Check</div>
      <div>
        {format(dateFnsDate, 'yyyy-MM-dd')}
        <br />
        {format(newDateFnsDate, 'yyyy-MM-dd')}
        <br />
        {format(newDateFnsDate2, 'yyyy-MM-dd')}
      </div>
      <br />
      <div>Summer Time (New York)</div>
      {/* timezone guess써서 어디시간인지 예측 */}
      {/* <div>{dayjs.tz.guess()}</div>  */}
      <div>
        2018년 3월 10일 13시에 하루 더하기:
        {timezoneFormat(add(new Date("2018-03-10 13:00:00"), { days: 1}),        
        "yyyy-MM-dd HH:mm:ssXXX",
        {
          timeZone: "America/New_York",
        }
        )}        
      </div>
      <div>
        2018년 3월 10일 13시에 24시 더하기:
        {timezoneFormat(
          add(
            toDate(new Date("2018-03-10 13:00:00"),{ 
              timeZone: "America/New_York",           
            }),
            { hours: 24 }                   
          ), 
          "yyyy-MM-dd HH:mm:ssXXX",         
          {
            timeZone: "America/New_York",
          }
        )}
      </div>    
      <br />
      <div>Leap Year (Korea)</div>
      <div>
        2017년 1월 1일 1년 빼기:        
        {format(sub(new Date("2017-01-01"), {years: 1}), "yyyy-MM-dd")}
      </div>
      <div>
        2017년 1월 1일에 365일 빼기:
        {format(sub(new Date("2017-01-01"), { days: 365}), "yyyy-MM-dd")}
      </div>
      <br />
      <div>
        한국어로 표기(07-17-2021을 2021년 7월 17일로 표기)
      </div>
      <div>{format(new Date("07-17-2021"), "yyyy년 M월 d일")}</div>
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
      <div>{`${differenceInHours(
        new Date("2021-07-17 03:00"),
        new Date("2021-07-18 02:00")
        )}시간`}</div>
    </div>
  );
}