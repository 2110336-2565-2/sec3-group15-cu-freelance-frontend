import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import tw, {styled} from "twin.macro"
import Button from "../components/share/Button"
import CircleImage from "../components/share/CircleImage"
import { AuthContext } from "../context/AuthProvider"
import React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { apiClient } from "../utils/axios"
const Container = styled.div(()=>[
    tw`flex flex-col w-full dt:w-1/3 gap-y-4 items-center mx-auto`
])
const CircleContainer = styled.div(()=>[
    tw`w-[100px] h-[100px] dt:w-[200px] dt:h-[200px]`
])
const Displayname = styled.div(()=>[
    tw`font-bold text-mobile-h1 dt:text-desktop-h1`
])
const Name = styled.div(()=>[
    tw`text-freelance-black-secondary text-mobile-h2 dt:text-desktop-h2`
])
const Phone = styled.div(()=>[
    tw`text-freelance-pink font-bold font-ibm mb-4`
])


const CustomerProfileView = ({customer_id})=>{
    const [customerImg, setCustomerImg] = useState();
    const [customerDisplayname, setCustomerDisplayname] = useState();
    const [customerName, setCustomerName] = useState();
    const [phone, setPhone] = useState();
    const AuthCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const chatHandler = ()=>{
        navigate('/chat');
    }
    const fetchData = async()=>{
        let response = await apiClient.get(`file/avatar?id=${customer_id}`);
        setCustomerImg(response.data.avatars[0].url);
        response = await apiClient.get(`user/freelance/${customer_id}`);
        console.log(response);
        setCustomerDisplayname(response.data.display_name);
        setCustomerName(`${response.data.firstname} ${response.data.lastname}`);
        setPhone(response.data.phone);
    } 
    useEffect(()=>{
        fetchData();
    },[])
    return (
        <>
            <Container>
                <CircleContainer>
                    <CircleImage image={customerImg}/>
                </CircleContainer>
                <Displayname>{customerDisplayname}</Displayname>
                <Name>{customerName}</Name>
                <Phone>{phone}</Phone>
                <Button primary onclick={chatHandler} width="60%"><b>แชทกับผู้ว่าจ้าง</b></Button>
            </Container>
        </>
    )    
}
export default CustomerProfileView;