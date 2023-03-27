import tw from "twin.macro"
import Card from "../../../assets/NewHomePage/page4/Card";

import { ReviewData } from "./ReviewData";

const Container = tw.div`
    snap-center
    flex flex-col items-center justify-center
    w-full h-screen
`

const Landing4 = () => {
    return ( 
        <Container>
            {
                ReviewData.map((data, index) => {
                    return (
                        <Card 
                            img={data.img}
                            title={data.title}
                            subtitle={data.subtitle}
                            desc={data.desc}
                            key={data.title}
                        />
                    )
                })
            }
        </Container>
     );
}
 
export default Landing4;