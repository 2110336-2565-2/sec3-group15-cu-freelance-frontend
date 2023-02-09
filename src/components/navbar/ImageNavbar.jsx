import "twin.macro"

const ImageNavbar=({image,onClick})=>{
    return <img src={image} onClick={onClick} tw="w-[12%] cursor-pointer"/>
}

export default ImageNavbar