import { useParams } from "react-router-dom";
import tw from "twin.macro";

const ProfilePage = () => {
  const BG = tw.div`min-h-[100vh] h-auto w-[100vw] pt-[15vh] flex justify-end`;
  const PortfolioCardWrapper = tw.div`w-[80%] h-auto flex flex-wrap gap-[5%]`;
  const params = useParams();

  return <BG>
    <PortfolioCardWrapper>

    </PortfolioCardWrapper>
  </BG>;
};

export default ProfilePage;
