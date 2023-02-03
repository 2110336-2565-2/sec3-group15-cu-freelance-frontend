import tw from "twin.macro";

const Button=(props)=>{

    const onClickHandler=()=>{
        console.log('hello');
        props.onClick();
       
    }

    const CustomButton=tw.button`w-[${props.width}]`
    
    return <CustomButton onClick={onClickHandler}>{props.children}</CustomButton>
}

export default Button