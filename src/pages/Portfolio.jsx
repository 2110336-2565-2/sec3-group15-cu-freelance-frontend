import tw from "twin.macro";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { authClient } from "../utils/auth";
import { apiClient } from "../utils/axios";
import { AuthContext } from "../context/AuthProvider";
import LoadingModal from "../components/share/LoadingModal";
import ImageCarousel from "../components/Portfolio/ImageCarousel";

const Container = tw.div`h-auto min-h-[95vh] w-screen p-[15vh]`;

const PortfolioPage = () => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const id = params.portId;
  const [portfolio, setPortfolio] = useState(null);

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (location.pathname.slice(0, 13) === "/my-portfolio") {
          response = await apiClient.get(`/portfolio/me/${id}`);
        } else response = await authClient.get(`/portfolio/${id}`);
        setPortfolio(response.data.portfolio);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const onClickSendHandler = (displayName, id) => {
    console.log(displayName, id);
    navigate("/create-order-request", {
      state: {
        displayName: displayName,
        id: id,
      },
    });
  };

  let show;
  if (portfolio) {
    show = (
      <>
        <ImagesContainer>
          {" "}
          <ImageCarousel />
        </ImagesContainer>
      </>
    );
  } else {
    show = <LoadingModal />;
  }

  return (
    <>
      <LoadingModal />
      <Container>{show}</Container>;
    </>
  );
};
export default PortfolioPage;
