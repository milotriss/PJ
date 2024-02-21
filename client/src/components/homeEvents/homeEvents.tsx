import React, { useState } from "react";
import "./homeEvents.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ModalEvent from "../modalEvent/modalEvent";


const HomeEvents = (): JSX.Element => {
  const [isModal,setIsModal] = useState<boolean>(false)
  const offModal = () => {
    setIsModal(false)
  }
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  return (
    <section id="event" className="homeEvents">
      <h1 className="animate" data-animate='tracking-in-expend 1s'>Events</h1>
      <Box width="100%" display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
        <Box gridColumn="span 4">
          <Item style={{borderRadius:"20px"}}><img width="100%" height={550} src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/events%2F46b566ef72467e57bd4a6556d4c6b37a.jpg?alt=media&token=29709867-818b-437b-b213-7bec9e669af5" alt="" /></Item>
        </Box>
        <Box gridColumn="span 2">
          <Item style={{borderRadius:"20px"}}><img width={"100%"} height={550} src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/events%2Fe30cd7a4971745d9b6110316e88e5403.jpg?alt=media&token=52fc96ce-fe1d-4131-a713-403362a1ae6d" alt="" /></Item>
        </Box>
        <Box gridColumn="span 6">
          <Item style={{borderRadius:"20px"}}><img width={"100%"} height={550} src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/events%2F6402c2d627e410480c95657434e63a01.jpg?alt=media&token=e0afc75a-15c1-4e31-93a1-c10d7a51bd91" alt="" /></Item>
        </Box>
        <Box gridColumn="span 5">
          <Item style={{borderRadius:"20px"}}><img width={"100%"} height={700} src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/events%2Fc302c975da0500c95dff048bbb3b224a.jpg?alt=media&token=4fbd4446-f1d8-44e8-986b-0fac97c885e8" alt="" /></Item>
        </Box>
        <Box gridColumn="span 5">
          <Item style={{borderRadius:"20px"}}><img width={"100%"} height={700} src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/events%2Fc5c7565f4879dd4b26bcdddebc1ea66d.jpg?alt=media&token=9163383e-36a0-4af5-ba26-1e762bf7d776" alt="" /></Item>
        </Box>
        <Box gridColumn="span 2">
          <Item style={{borderRadius:"20px"}}><img width={"100%"} height={700} src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/events%2F2c3729b3ff18e4ec6435f81a2c36b321.jpg?alt=media&token=465d5f78-3cd0-4c7c-bbad-9faef147d833" alt="" /></Item>
        </Box>
        <Box gridColumn="span 4">
          <Item style={{borderRadius:"20px"}}><img width={"100%"} height={400} src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/events%2F4ded600659549943715f9824d20a02b5.jpg?alt=media&token=dcc776c8-a5a9-4920-bdf2-2309d5bd08b0" alt="" /></Item>
        </Box>
        <Box gridColumn="span 6">
          <Item style={{borderRadius:"20px"}}><img width={"100%"} height={400} src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/events%2F1d26e55d65fd0e6c3bc1431dcb7ccf73.jpg?alt=media&token=b2f292d7-b18a-4569-92c9-1ac03d0164ec" alt="" /></Item>
        </Box>
        <Box gridColumn="span 2">
          <Item style={{borderRadius:"20px"}}><img width={"100%"} height={400} src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/events%2F50d300963d2b8fc16052cf3a42067780.jpg?alt=media&token=243ae661-a0d7-4c56-87e3-fb74ec1d5eb7" alt="" /></Item>
        </Box>
      </Box>
      <button className="btnEvent" onClick={() => setIsModal(true)}>Booking Events</button>
      {isModal ? <ModalEvent offModal={offModal}/> : null}
    </section>
  );
};

export default HomeEvents;
