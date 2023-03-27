import tw, {styled} from "twin.macro"
import { useNavigate } from "react-router-dom"
import personIcon from "../assets/PersonIcon.svg"
import keyIcon from "../assets/KeyIcon.svg"
const Container = styled.div(()=>[
    tw`flex mt-[10vh] flex-col m-auto min-h-[85vh]`
])
const Title = styled.div(()=>[
    tw`font-bold font-ibm text-mobile-h1 text-center mt-10`
])
const ListContainer = styled.div(()=>[
    tw`flex flex-col mx-auto mt-10 gap-y-8 shadow-[0_4px_4px_rgba(0,0,0,0.25)] 
    rounded-[20px] py-12 min-h-[50vh] justify-start w-3/4`
])
const List = styled.div(()=>[
    tw`flex flex-row mr-2 hover:cursor-pointer gap-x-4  hover:bg-gray-50`
])
const Img = styled.img(()=>[
    tw`mx-2`
])
const Path = styled.div(()=>[
    tw`font-ibm text-mobile-h1`
])
const Hr = styled.div(()=>[
    tw`border-gray-400 border-[1px]`
])
const UserSettingEntrancePage = ()=>{
    const navigate = useNavigate();
    const onClickHandler = (path)=>{
        navigate(path);
    }
    return (
        <Container>
            <Title>ตั้งค่าข้อมูลผู้ใช้</Title>
            <ListContainer>
                <List>
                    <Img src={personIcon}/>
                    <Path onClick={onClickHandler.bind(null, '/edit-profile')}>แก้ไขข้อมูลส่วนตัว</Path>
                </List>
                {/* <Hr/> */}
                <List>
                    <Img src={keyIcon}/>
                    <Path onClick={onClickHandler.bind(null, '/change-password')}>เปลี่ยนรหัสผ่าน</Path>
                </List>
                {/* <Hr/> */}
            </ListContainer>
        </Container>
    )
}
export default UserSettingEntrancePage;