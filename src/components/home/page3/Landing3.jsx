import HeroDesktop from "../../../assets/NewHomePage/page3-hero.png";
import HeroMobile from "../../../assets/NewHomePage/page3-hero-mobile.png";

import tw from "twin.macro";

const Wrapper = tw.div`
w-[90%] max-w-[1200px] mx-auto font-ibm font-light
flex flex-col items-center justify-center dt:flex-row
h-[100vh] snap-center`

const HeroImgDesktop = tw.img`hidden w-[100%]  max-w-[300px] dt:max-w-[600px] object-contain mt-8 mb-8 dt:block`
const HeroImgMobile = tw.img`block w-[100%]  max-w-[400px] dt:max-w-[600px]  object-contain mt-8 mb-8 dt:hidden`

const RightWrapper = tw.div`flex flex-col justify-center gap-4 text-center`
const HeaderWrapper = tw.div``;
const Header = tw.h1`text-4xl text-freelance-landing-purple`
const HeaderStressed = tw.span`font-bold`

const Description = tw.p`text-lg text-freelance-landing-purple mt-4`

const Landing3 = () => {
    return (
        <Wrapper>
            <HeroImgDesktop src={HeroDesktop} alt="Hero" />
            <HeroImgMobile src={HeroMobile} alt="Hero" />
            <RightWrapper>
                <HeaderWrapper>
                    <Header> เราเป็น <HeaderStressed> ตัวกลาง </HeaderStressed></Header>
                    <Header> ในการรับจ้างงานนิสิต</Header>
                </HeaderWrapper>
                <Description>

                    เราเชื่อว่านิสิตจุฬาได้เรียนรู้และเข้าใจวิชาต่าง ๆ
                    มาเป็นอย่างดี สามารถใช้ ความรู้ที่เรียนมาใน
                    การสร้างสรรค์ผลงานออกมาอย่างมีประสิทธิภาพ
                </Description>
            </RightWrapper>

        </Wrapper>
    );
}

export default Landing3;