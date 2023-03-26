import HeroDesktop from "../../../assets/NewHomePage/page3-hero.png";
import HeroMobile from "../../../assets/NewHomePage/page3-hero-mobile.png";

import { motion } from "framer-motion";
import tw from "twin.macro";

import { fadeIn } from "../../../assets/NewHomePage/fadeIn";

const Wrapper = tw.div`
w-[90%] max-w-[1200px] mx-auto font-ibm font-light
flex flex-col items-center justify-center dt:flex-row
h-[100vh] snap-start`;

const HeroImgDesktop = tw.img`hidden w-[100%]  max-w-[300px] dt:max-w-[600px] object-contain mt-8 mb-8 dt:block`;
const HeroImgMobile = tw.img`block w-[100%]  max-w-[300px] dt:max-w-[600px]  object-contain mt-8 mb-8 dt:hidden`;
const Section = tw.div`h-screen w-full flex justify-center items-center`;

const RightWrapper = tw.div`flex flex-col justify-center gap-4 text-center`;
const HeaderWrapper = tw.div``;
const Header = tw.h1`text-4xl text-freelance-landing-purple`;
const HeaderStressed = tw.span`font-extrabold`;

const Description = tw.p`text-lg text-freelance-landing-purple mt-4`;

const Landing3 = () => {
  return (
    <Wrapper>
      <Section>
        <div tw="flex flex-col  dt:flex-row justify-center items-center">
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            tw="relative max-w-[500px] w-fit"
          >
            <HeroImgDesktop src={HeroDesktop} alt="Hero" />
          </motion.div>
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            tw="relative max-w-[500px] w-fit"
          >
            <HeroImgMobile src={HeroMobile} alt="Hero" />
          </motion.div>

          <div tw="flex flex-col">
            <div tw="flex flex-col gap-2 dt:gap-4">
              <motion.h1
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                tw="font-ibm font-medium text-2xl dt:text-5xl "
              >
                {" "}
                เราเป็น <HeaderStressed> ตัวกลาง</HeaderStressed>
              </motion.h1>

              <motion.h1
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                tw="font-ibm font-medium text-2xl dt:text-5xl "
              >
                {" "}
                ในการรับจ้างงานนิสิต
              </motion.h1>
              <motion.p
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                tw="mt-2 font-ibm text-lg dt:text-xl max-w-[600px]"
              >
                เราเชื่อว่านิสิตจุฬาได้เรียนรู้และเข้าใจวิชาต่าง ๆ มาเป็นอย่างดี
                สามารถใช้ ความรู้ที่เรียนมาใน
                การสร้างสรรค์ผลงานออกมาอย่างมีประสิทธิภาพ
              </motion.p>
            </div>
          </div>
        </div>
      </Section>
    </Wrapper>
  );
};

export default Landing3;
