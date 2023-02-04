import "twin.macro"
import searchIcon from '../../assets/searchIcon.svg'

const InputSearch=(props)=>{
    return <div>
        <input type="text" placeholder={props.placeholder}/>
        <img src={searchIcon} alt="searchIcon"/>
    </div>
}

export default InputSearch