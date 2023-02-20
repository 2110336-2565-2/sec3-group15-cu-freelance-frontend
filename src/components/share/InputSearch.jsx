import "twin.macro"
import searchIcon from '../../assets/searchIcon.svg'

const InputSearch=(props)=>{
    return <form onSubmit={(event)=>{event.preventDefault();console.log("hello")}} tw="relative border rounded-[20px]  w-full h-full px-[2px]">
        <input type="text" placeholder="อาหาร แปลรายงาน" tw="border-none font-ibm text-[#D62B70] focus:outline-none placeholder:font-ibm  p-2  bg-transparent ml-[12%] w-[85%] h-[100%] text-base"/>
        <img src={searchIcon} alt="searchIcon" tw="w-[5%] absolute left-3.5 top-1/2 translate-y-[-50%]"/>
    </form>
}

export default InputSearch