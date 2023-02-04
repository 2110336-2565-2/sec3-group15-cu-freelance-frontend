import "twin.macro"
import searchIcon from '../../assets/searchIcon.svg'

const InputSearch=(props)=>{
    return <div tw="relative border-2 border-[#D62B70] w-[279px] h-[4vh] px-[2px] rounded-[10px]">
        <input type="text" placeholder="จ้างฟรีเเลนซ์ทำ..." tw="border-none focus:outline-none bg-transparent ml-[26px] w-[240px] text-[20px]"/>
        <img src={searchIcon} alt="searchIcon" tw="w-[26px] absolute left-0 top-0"/>
    </div>
}

export default InputSearch