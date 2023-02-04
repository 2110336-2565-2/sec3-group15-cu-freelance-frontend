import "twin.macro"
import searchIcon from '../../assets/searchIcon.svg'

const InputSearch=(props)=>{
    return <div tw="relative border-[5px] border-[#D62B70] w-[70%] h-[80%] px-[2px] rounded-[10px]">
        <input type="text" placeholder="จ้างฟรีเเลนซ์ทำ..." tw="border-none focus:outline-none bg-transparent ml-[15%] w-[80%] text-base"/>
        <img src={searchIcon} alt="searchIcon" tw="w-[11%] absolute left-0 top-0"/>
    </div>
}

export default InputSearch