import tw from "twin.macro";

import React from "react";
import { motion } from "framer-motion";
import { SnapList, SnapItem } from "react-snaplist-carousel";

import { fadeIn } from "../../../assets/NewHomePage/fadeIn";

import Card from "../../../assets/NewHomePage/page4/Card";
import QuoteL from "../../../assets/NewHomePage/page4/QuoteL.png";
import QuoteR from "../../../assets/NewHomePage/page4/QuoteR.png";
import { ReviewData } from "./ReviewData";

const Container = tw.div`

    snap-center font-ibm
    flex flex-col items-center justify-center gap-8
     h-[95vh] overflow-hidden
`;

const Elem = () => (
  <SnapList>
    {ReviewData.map((data, index) => {
      return (
        <SnapItem
          margin={{ left: "15px", right: "15px", top: "0px", bottom: "20px" }}
          snapAlign="center"
        >
          <Card
            img={data.img}
            title={data.title}
            subtitle={data.subtitle}
            desc={data.desc}
            key={data.id}
          />
        </SnapItem>
      );
    })}
  </SnapList>
);

const HeaderText = tw.h1`text-freelance-black-primary text-2xl tbl:text-4xl font-bold`;
const QuoteImg = tw.img`w-12 h-12`;
const Landing4 = () => {
  return (
    <Container>
      <motion.div
        variants={fadeIn("down ", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        tw=""
      >
        <HeaderText> รีวิวจากผู้ใช้งานจริง </HeaderText>
      </motion.div>
      <QuoteImg src={QuoteL} tw="ml-8 dt:ml-16 self-start" />
      <motion.div
        variants={fadeIn("up", 0.5)}
        initial="hidden"
        whileInView={"show"}
        // viewport={{ once: false, amount: 1 }}
        tw="w-screen max-w-[1200px]"
      >
        <Elem />
      </motion.div>
      <QuoteImg src={QuoteR} tw="mr-8 dt:mr-16 self-end" />
    </Container>
  );
};

export default Landing4;
