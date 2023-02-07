import { useParams } from "react-router-dom";
import tw from "twin.macro"

const ProfilePage=()=>{
    const BG=tw.div`min-h-[100%] h-auto w-[100vw] pt-[15vh] flex justify-end`
    const PortfolioCardWrapper=tw.div`w-[80%]`
    const params=useParams();

    return <div>Profile</div>
}

export default ProfilePage