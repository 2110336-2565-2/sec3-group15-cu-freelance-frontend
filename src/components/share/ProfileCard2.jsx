import tw from "twin.macro";
import Card from "../share/Card";
import Button from "./Button";
const ProfileCard2 = ({userImage, username, portCount, avgTime})=>{
    const Container = tw.div`flex flex-row justify-between font-ibm text-[#D62B70] w-fit gap-x-8`;
    const LeftSection = tw.div`flex flex-col items-center text-center font-bold gap-2`;
    const Image = tw.img``;
    const Name = tw.div``;
    const RightSection = tw.div`flex flex-col justify-between`;
    const Status = tw.div`flex flex-row justify-between gap-x-8 font-semibold`
    return (
        <Card hasShadow={true} type="portfolio2">
            <Container>
                <LeftSection>
                    <Image src={userImage}/>
                    <Name>{username}</Name>
                </LeftSection>
                <RightSection>
                    <Status>
                        <div>{"ขายงานแล้ว"}</div>
                        <div>{`${portCount} ครั้ง`}</div>
                    </Status>
                    <Status>
                        <div>{"เวลาตอบกลับเฉลี่ย"}</div>
                        <div>{`${avgTime} ครั้ง`}</div>
                    </Status>
                    <Button width="90%" disable={true} onClick={()=>{console.log("test")}}>แชทกับฟรีแลนซ์</Button>
                </RightSection>
            </Container>
        </Card>
    )
}
export default ProfileCard2;