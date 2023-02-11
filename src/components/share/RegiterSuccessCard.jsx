import tw from "twin.macro"
import Card from "./Card";
import CheckIcon from "../../assets/CheckIcon.png"
import { useNavigate } from "react-router-dom";
const styles = {
    content:()=>[
        tw`flex flex-col h-fit text-center items-center gap-y-8 py-2 px-4`
    ],
    image:()=>[
        tw`w-[40%]`
    ],
    text:()=>[
        tw`text-[#D62B70] px-24 text-4xl font-ibm font-bold leading-normal`
    ],
    button:()=>[
        tw`font-ibm text-2xl bg-[#D62B70] w-full rounded-[10px] py-4 text-white font-bold`
    ]
}
const RegisterSuccessCard = ()=>{
    const navigate = useNavigate();
    const onClickHandler=()=>{
        navigate('/home');
    }
    return (
        <Card type="registerSuccess">
            <div css={styles.content()}>
                <img css={styles.image()} src={CheckIcon}/>
                <h1 css={styles.text()}>
                    ลงทะเบียนสำเร็จ<br/>
                    ยินดีต้อนรับสู่<br/>
                    CU Freelance
                </h1>
                <button css={styles.button()} onClick={onClickHandler}> 
                    Return to Home
                </button>
            </div>
        </Card>
    )
}
export default RegisterSuccessCard;