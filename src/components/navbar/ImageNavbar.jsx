import "twin.macro"

const ImageNavbar=({image,onClick})=>{
    return <img src={image} onClick={onClick} tw="w-[12%] cursor-pointer  hover:ring-2"/>
}

export default ImageNavbar