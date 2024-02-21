import React, { useState } from "react";
import "./modalEvent.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
interface Props {
  offModal:Function
}
const ModalEvent = (props:Props): JSX.Element => {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );

  return (
    <section onClick={() => props.offModal()} className="modalEventOverlay">
      <div onClick={(e:any)=> e.stopPropagation()} className="modalEvent">
        <h1>Booking Event</h1>
        <div>
          <select name="" id="">
            <option value="">--Choose Events--</option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Camping">Camping</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Tet holiday">Tet holiday</option>
            <option value="Tea break">Tea break</option>
            <option value="Mid autumn">Mid autumn</option>
          </select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
              className="iconDatePicker"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                label="Choose date and time"
              />
            </DemoContainer>
          </LocalizationProvider>
          <div className="modalEventItems">
            <label htmlFor="">Email</label>
            <input placeholder=" " name="email" type="email" />
          </div>
          <div className="modalEventItems">
            <label htmlFor="">Phone</label>
            <input placeholder=" " name="phone" type="text" />
          </div>
          <button className="btnModalEvent">Create</button>
        </div>
      </div>
    </section>
  );
};

export default ModalEvent;
