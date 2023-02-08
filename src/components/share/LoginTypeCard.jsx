import tw from "twin.macro"
import Card from "./Card"
const avatarVariants={
    left: tw`h-[100%] box-border absolute -bottom-[17%] right-[50%] translate-x-[50%]`,
    right: tw`box-border absolute -bottom-[18%] right-[50%] translate-x-[50%] rotate-[356deg]`
};
const styles={
    container:()=>[
        tw`flex flex-col relative h-[100%]`
    ],
    text:()=>[
        tw`text-[36px] text-[#D62B70] font-bold font-ibm`
    ],
    avatar:({type})=>[
        avatarVariants[type]
    ]
};
const LoginTypeCard=({text, avatar, type, onClick})=>{
    return (
        <Card type="loginType" onClick={onClick}>
            <div css={styles.container}>
                <div css={styles.text}>{text}</div>
                <img css={styles.avatar({type})} src={avatar}/>
            </div>
        </Card>
    )
}

export default LoginTypeCard;