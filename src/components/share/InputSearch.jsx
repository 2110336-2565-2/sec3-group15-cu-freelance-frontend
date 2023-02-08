import "twin.macro"
import searchIcon from '../../assets/searchIcon.svg'

const InputSearch=(props)=>{
    return <div tw="relative border-4 border-[#D62B70] w-[70%] h-[100%] px-[2px] rounded-md">
        <input type="text" placeholder="จ้างฟรีเเลนซ์ทำ..." tw="border-none font-ibm text-[#D62B70] focus:outline-none placeholder:font-ibm  bg-transparent ml-[12%] w-[85%] h-[100%] text-base"/>
        <img src={searchIcon} alt="searchIcon" tw="w-[11%] absolute left-0 top-1/2 translate-y-[-50%]"/>
    </div>
}

export default InputSearch