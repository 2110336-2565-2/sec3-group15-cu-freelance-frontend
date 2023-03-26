import DecorDesktop from "../../../assets/NewHomePage/page1-decor-desktop.png";
import DecorMobile from "../../../assets/NewHomePage/page1-decor-mobile.png";
import tw from "twin.macro";

const Wrapper = tw.div`
w-[90%] max-w-[1200px] mx-auto font-ibm font-light
flex flex-col items-center justify-center dt:flex-row
h-[100vh] snap-center`

const BGDesktop = tw.div`hidden landing:block bg-[url('/src/assets/NewHomePage/page1-decor-desktop.png')] h-full w-full bg-no-repeat bg-contain bg-center`

const BGMobile = tw.div`block landing:hidden bg-[url('/src/assets/NewHomePage/page1-decor-mobile.png')] h-full w-full bg-no-repeat bg-contain bg-center`

const Landing1 = () => {
    return ( 
        <Wrapper>
            <BGDesktop>
            </BGDesktop>

            <BGMobile>

            </BGMobile>
        </Wrapper>
     );
}
 
export default Landing1;