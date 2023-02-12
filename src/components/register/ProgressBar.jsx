import tw from "twin.macro"
import StateButton from "./StateButton"
const styles = {
    container:()=>[
        tw`flex flex-row justify-between w-[80%] items-center py-[2%]`,
    ],
}
const ProgressBar= ({onClick, state,formValid,progress})=>{
    return (
        <div css={styles.container()}>
            <StateButton num={1} active={state>=1} progress={progress} onClick={onClick} formValid={formValid}/>
            <StateButton active={state>=2} small={true}/>
            <StateButton active={state>=2} small={true}/>
            <StateButton num={2} active={state>=2} progress={progress} onClick={onClick} formValid={formValid}/>
            <StateButton active={state>=3} small={true}/>
            <StateButton active={state>=3} small={true}/>
            <StateButton num={3} active={state>=3} progress={progress} onClick={onClick} formValid={formValid}/>

        </div>
    )
}
export default ProgressBar;