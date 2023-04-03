import tw from "twin.macro"

const Container = tw.div`font-ibm 
min-w-[300px] min-h-[280px]
flex flex-col gap-4
rounded-xl border-black/20 border-[0.5px] border-solid
px-10 py-8 shadow-lg

text-freelance-black-primary
`
const Header = tw.div`flex flex-row gap-6`
const HeaderImg = tw.img`w-24 h-24 rounded-full`
const HeaderText = tw.div`flex flex-col justify-center gap-1`
const HeaderTextTitle = tw.h1`text-lg tbl:text-2xl font-bold`
const HeaderTextSubTitle = tw.h2`text-freelance-black-secondary  text-lg tbl:text-xl font-normal`
const Description = tw.div`text-freelance-black-secondary flex flex-col justify-center`
const DescriptionText = tw.p`text-base tbl:text-lg font-normal max-w-[240px]`

const Card = ( { img , title , subtitle, desc}) => {
    return ( 
        <Container>

            <Header>
                <HeaderImg src={img} alt="img" />
                <HeaderText>
                    <HeaderTextTitle>
                        {title}
                    </HeaderTextTitle>
                    <HeaderTextSubTitle>
                        {subtitle}
                    </HeaderTextSubTitle>
                </HeaderText>
            </Header>
            <Description>
                <DescriptionText>
                    {desc}
                </DescriptionText>
            </Description>


        </Container>
     );
}
 
export default Card;