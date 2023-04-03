import tw from "twin.macro";
import StateButton from "./StateButton";
const styles = {
  container: () => [
    tw`flex flex-row justify-between w-full items-center py-[2%] place-self-center
        dt:w-[80%] dt:max-w-[500px]
        `,
  ],
};
const ProgressBar = ({
  onClick,
  state,
  formValid,
  progress,
  step = 3,
  text1,
  text2,
  text3,
  text4,
}) => {
  return (
    <div css={styles.container()}>
      <StateButton
        text={text1}
        num={1}
        active={state == 1}
        progress={progress}
        onClick={onClick}
        formValid={formValid}
      />
      {/* <StateButton active={state>=2} small={true}/>
            <StateButton active={state>=2} small={true}/> */}
      <hr tw="w-full" />
      <StateButton
        text={text2}
        num={2}
        active={state == 2}
        progress={progress}
        onClick={onClick}
        formValid={formValid}
      />
      <hr tw="w-full" />
      {/* <StateButton active={state>=3} small={true}/>
            <StateButton active={state>=3} small={true}/> */}
      <StateButton
        text={text3}
        num={3}
        active={state == 3}
        progress={progress}
        onClick={onClick}
        formValid={formValid}
      />
      {step === 4 && <hr tw="w-full" />}
      {/* {step==4 && 
            <StateButton active={state>=4} small={true}/>
            }
            {step==4 &&
            <StateButton active={state>=4} small={true}/>
            } */}
      {step == 4 && (
        <StateButton
          text={text4}
          num={4}
          active={state == 4}
          progress={progress}
          onClick={onClick}
          formValid={formValid}
        />
      )}
    </div>
  );
};
export default ProgressBar;
