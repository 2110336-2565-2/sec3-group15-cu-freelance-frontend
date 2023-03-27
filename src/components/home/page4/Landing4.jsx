import tw from "twin.macro"

import React from 'react';
import { motion } from "framer-motion";
import { useSnapCarousel } from 'react-snap-carousel';

import Card from "../../../assets/NewHomePage/page4/Card";
import QuoteL from "../../../assets/NewHomePage/page4/QuoteL.png"
import QuoteR from "../../../assets/NewHomePage/page4/QuoteR.png"
import { ReviewData } from "./ReviewData";

const Container = tw.div`
    snap-center font-ibm
    flex flex-col items-center justify-center gap-8
     h-screen overflow-hidden
`

const Item = tw(motion.div)`min-h-[20rem] min-w-[30rem] p-10`
const Img = tw.img`w-full h-full rounded-[2rem]`

const Elem = () => {
    const { scrollRef, pages, activePageIndex, next, prev, goTo } =
        useSnapCarousel();
    return (
        <>
            <div tw="w-full relative ">
            <ul
                ref={scrollRef}
                tw="relative flex flex-row overflow-hidden snap-x snap-mandatory"
            >
                {
                    ReviewData.map((data, index) => {
                    return (
                        <motion.div
                            tw="min-h-[10rem] min-w-[20rem] py-4 px-2"
                            transition={{ duration: 3 }}
                        >
                        <Card 
                             img={data.img}
                             title={data.title}
                             subtitle={data.subtitle}
                             desc={data.desc}
                             key={index}
                         />
                        </motion.div>
                    );
                })}
            </ul>
                    <button tw="absolute bottom-[45%] left-0" onClick={() => prev()}>Prev</button>
                    <button tw="absolute bottom-[45%] right-0"onClick={() => next()}>Next</button>
            </div>

            <div tw=" flex flex-col gap-2 items-center">
                {activePageIndex + 1} / {pages.length}

            </div>
            {/* <ol style={{ display: 'flex' }}>
                {pages.map((_, i) => (
                    <li key={i}>
                        <button
                            style={i === activePageIndex ? { opacity: 0.5 } : {}}
                            onClick={() => goTo(i)}
                        >
                            {i + 1}
                        </button>
                    </li>
                ))}
            </ol> */}
        </>
    );
};





const HeaderText = tw.h1`text-4xl font-bold`
const QuoteImg = tw.img`w-12 h-12`
const Landing4 = () => {
    return ( 
        <Container>
            <HeaderText> รีวิวจากผู้ใช้จริง </HeaderText>
            <QuoteImg src={QuoteL} tw="ml-8 self-start"/>
            <Elem/>
            <QuoteImg src={QuoteR} tw="mr-8 self-end"/>
        </Container>
        //     {
        //         ReviewData.map((data, index) => {
        //             return (
        //                 <Card 
        //                     img={data.img}
        //                     title={data.title}
        //                     subtitle={data.subtitle}
        //                     desc={data.desc}
        //                     key={data.title}
        //                 />
        //             )
        //         })
        //     }
     );
}
 
export default Landing4;