import tw from "twin.macro";
import XIcon from "../../assets/XIcon.svg";
import { motion } from "framer-motion";
const Container = tw.div`p-2 flex gap-2 items-center text-mobile-body text-freelance-black-primary font-ibm border rounded-2xl border-freelance-black-secondary`;
const Cross = tw.img`cursor-pointer`;

const FilterButton = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      tw="p-2 flex gap-2 items-center text-mobile-body text-freelance-black-primary font-ibm border rounded-2xl border-freelance-black-secondary"
    >
      {props.text}
      <Cross src={XIcon} onClick={props.onClick} />
    </motion.div>
  );
};

export default FilterButton;
