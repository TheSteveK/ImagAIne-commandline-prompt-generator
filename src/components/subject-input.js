import React from "react";
import PropTypes from "prop-types";

const SubjectInput = ({ subject, handleSubjectChange }) => {
  return (
    <textarea
      className="subject-input"
      type="text"
      id="subject"
      name="subject"
      value={subject}
      onChange={handleSubjectChange}
    />
  );
};

SubjectInput.propTypes = {
  subject: PropTypes.string.isRequired,
  handleSubjectChange: PropTypes.func.isRequired,
};

export default SubjectInput;
