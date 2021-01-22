const MAX_TEXT_FIELD_LENGTH = 50;
const MAX_EMAIL_TEXT_FIELD_LENGTH = 129;
const RULES = {
    required: v => !!v || "Field is required",
    eightLength: v => v.length >= 8 || "Need to be at least 8 length",
    fiveLength: v => v.length >= 5 || "Need to be at least 5 length",
    oneLength: v => v.length >= 1 || "Need to be at least 1 length",
    email: v => /.+@.+\..+/.test(v) || "E-mail is invalid",
    counter: v => v.length <= MAX_TEXT_FIELD_LENGTH || `Max ${MAX_TEXT_FIELD_LENGTH} characters`,
    counterEmail: v => v.length <= MAX_EMAIL_TEXT_FIELD_LENGTH || `Max ${MAX_EMAIL_TEXT_FIELD_LENGTH} characters`,
    azString: v => (v.length == 0 || /^[a-zA-Z0-9_]+$/.test(v)) || "Need to contains a-z 0-9 and _",
};

const FILTERS = {
  shortDescription(v) {
    const MAX_LEN = 250;
    if (v.length < MAX_LEN) return v;

    return v.slice(0, MAX_LEN) + "...";
  },
};

export {
  MAX_TEXT_FIELD_LENGTH,
  MAX_EMAIL_TEXT_FIELD_LENGTH,
  RULES,
  FILTERS,
}