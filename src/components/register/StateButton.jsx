import tw from "twin.macro"
const styles = {
    container:({active, small})=>[
        tw`aspect-square w-[36px] h-[36px] rounded-full text-[#D62B70] border-[2px] border-[#D62B70]`,
        active && tw`bg-[#D62B70] text-white`,
        small && tw`aspect-square w-[16px] h-[16px]`
    ],
}
const StateButton = ({num, active=false, small=false, onClick})=>{
    const onClickHandler=()=>{
        onClick(num);
    }
    return (
        <button css={styles.container({active, small})} onClick={onClickHandler}>
        {num}
        </button>
    )
}
export default StateButton;