import tw from "twin.macro";
import Input from "../components/share/Input";
import IssueReportForm from "../components/home/issueReport/IssueReportForm";

const BG = tw.div`font-ibm w-full h-full flex flex-col items-center pt-[7vh] dt:pt-[10vh]`;
const Header = tw.div`font-bold text-xl`;
const FormContainer = tw.div`w-full max-w-[600px] flex flex-col h-full`;

const IssueReportPage = () => {
  return (
    <BG>
      <Header>รายงานปัญหา</Header>
      <FormContainer>
        <IssueReportForm />
      </FormContainer>
    </BG>
  );
};

export default IssueReportPage;
