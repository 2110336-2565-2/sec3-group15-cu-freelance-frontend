const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";
const VALIDATOR_TYPE_MATCH = "MATCH";
const VALIDATOR_TYPE_PHONE = "PHONE";
const VALIDATOR_TYPE_PRICE = "PRICE";
const VALIDATOR_TYPE_UNMATCH = "UNMATCH";
const VALIDATOR_TYPE_SPECIALCHAR = "SPECIAL";
const VALIDATOR_TYPE_NOT_CONTAIN_NUMBER = "NOT_CONTAIN_NUMBER";

export const VALIDATOR_NOT_CONTAIN_NUMBER = () => ({
  type: VALIDATOR_TYPE_NOT_CONTAIN_NUMBER,
});
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_MATCH = (val) => ({
  type: VALIDATOR_TYPE_MATCH,
  val: val,
});
export const VALIDATOR_PHONE = () => ({ type: VALIDATOR_TYPE_PHONE });
export const VALIDATOR_PRICE = () => ({ type: VALIDATOR_TYPE_PRICE });
export const VALIDATOR_SPECIALCHAR = () => ({
  type: VALIDATOR_TYPE_SPECIALCHAR,
});
export const VALIDATOR_UNMATCH = (val) => ({
  type: VALIDATOR_TYPE_UNMATCH,
  val: val,
});
export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_SPECIALCHAR) {
      isValid = isValid && /^[\u0E00-\u0E7Fa-zA-Z0-9\s]+$/gm.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_NOT_CONTAIN_NUMBER) {
      isValid = isValid && /^[^\d]*$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^[^\W_]+?@[^\W_].[^\W_]/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_MATCH) {
      isValid = isValid && value === validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_PHONE) {
      isValid = isValid && /^0\d{9}$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_PRICE) {
      isValid = isValid && /^[1-9][0-9]*$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_UNMATCH) {
      isValid = isValid && !(value === validator.val);
    }
  }
  return isValid;
};
