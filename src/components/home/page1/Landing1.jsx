import tw from "twin.macro";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

import Hero from "../../../assets/NewHomePage/page1/Hero.png";
import Circle from "../../../assets/NewHomePage/page1/circle16.png";
import { fadeIn } from "../../../assets/NewHomePage/fadeIn";

// NewHomePage/page1
import AboveImg from "../../../assets/NewHomePage/page1/AboveImg.png";
import BelowImg from "../../../assets/NewHomePage/page1/BelowImg.png";
import UpLeft from "../../../assets/NewHomePage/page1/UpLeft.png";
import DownLeft from "../../../assets/NewHomePage/page1/DownLeft.png";
import RightBelow from "../../../assets/NewHomePage/page1/RightBelow.png";
import BagLine from "../../../assets/NewHomePage/page1/BagLine.png";

const Typer = () => {
  return (
    <TypeAnimation
      sequence={[
        "ถ่ายรูป", // Types 'One'
        1000, // Waits 1s
        "ทำอาหาร", // Deletes 'One' and types 'Two'
        1000, // Waits 1s
        "แปลงาน", // Deletes 'One' and types 'Two'
        1000,
        () => {
          console.log("Sequence completed");
        },
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      // style={{
      //   fontSize: "1rem",
      //   display: "inline-block",
      //   fontFamily: "Noto Sans Thai",
      //   minWidth: "200px",
      //   '@media (min-width: 550px)': {
      //     fontSize: "3rem",
      //   }
      // }}
      tw="text-xl tbl:text-4xl font-ibm text-center"
    />
  );
};

const Section = tw.div`h-screen w-full flex justify-center items-center`;
const LeftWrapper = tw.div`flex flex-col justify-start max-w-[300px] tbl:max-w-full `;
const RightWrapper = tw.div`hidden dt:block`;
const ImgHero = tw.img` min-w-[1/2] min-h-[1/2]`;

const Framer3 = () => {
  return (
    <div tw="snap-start overflow-hidden">
      <Section>
        <div tw="flex flex-row items-center justify-start tbl:justify-around gap-4 w-[90%] max-w-[1200px] mx-auto">
          <img
            src={AboveImg}
            alt="Above img"
            tw="absolute -z-10 top-[20%] left-[67%] max-w-[30px]"
          />
          <img
            src={BelowImg}
            alt="Below img"
            tw="absolute -z-10 bottom-[20%] left-[60%] max-w-[12px]"
          />
          <img
            src={RightBelow}
            alt="Below img"
            tw="absolute -z-10 bottom-[8%] dt:bottom-[25%] left-[90%] max-w-[16px]"
          />
          <img
            src={UpLeft}
            alt="UpLeft img"
            tw="absolute -z-10 top-[22%] left-[10%] max-w-[12px]"
          />
          <img
            src={DownLeft}
            alt="Below img"
            tw="absolute -z-10 bottom-[14%] dt:bottom-[30%] left-[20%] max-w-[16px]"
          />
          {/* <img src={LineImg} alt="line NewHomePage/page1" tw="absolute left-0 w-[40%] max-w-[500px]"/> */}
          {/* <img src={BagImg} alt="bag NewHomePage/page1" tw="absolute left-[28%] top-[22%] w-[40%] max-w-[160px]"/> */}
          <img
            src={BagLine}
            alt="NewHomePage/page1"
            tw="-z-10 absolute left-0 top-[20%] min-w-[300px] max-w-[40%] dt:top-[12%] dt:w-[35%] dt:max-w-[300px]"
          />

          <LeftWrapper>
            <motion.h2
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              tw="font-ibm text-2xl tbl:text-3xl font-light mb-8"
            >
              {" "}
              ยินดีต้อนรับสู่
            </motion.h2>
            <div tw="flex flex-col gap-4 max-w-[500px]">
              <motion.h1
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                tw="font-ibm text-3xl tbl:text-5xl font-bold break-words leading-normal tbl:leading-relaxed"
              >
                {" "}
                แหล่งรวมฟรีแลนซ์คุณภาพจากจุฬาฯ
              </motion.h1>
            </div>
            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              tw="mt-4"
            >
              <Typer />
            </motion.div>
          </LeftWrapper>
          <RightWrapper>
            {/* <motion.img src={Circle} alt="absolute inset-0 -z-1 circle" tw="w-[300px]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2 }}/>
                <motion.img src={Hero} alt="absolute" tw="w-[300px]" initial={{ scale: 1 }} animate={{ scale: 1 }} transition={{ duration: 2 }}/> */}
            <motion.div
              variants={fadeIn("down", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              tw="relative max-w-[500px] w-fit"
            >
              <motion.img
                src={Circle}
                alt="Circle img"
                tw="absolute -z-10 -inset-y-5 min-w-[50%] "
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5 }}
              />
              <ImgHero src={Hero} alt="Hero img" />
            </motion.div>
          </RightWrapper>
        </div>
      </Section>
    </div>
  );
};

export default Framer3;
