import React from "react";
import { connect } from "react-redux";

import { Form } from "react-bootstrap";

import { setFilter } from "../../actions/actions";

// visibility filter component
function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Search..."
      style={{ width: "115em", marginLeft: "2em" }}
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
