import React from "react";
import PropTypes from "prop-types";

import { TableRow } from "@material-ui/core";

import EnigmaTableCell from "./Cell";

const Row = ({ row, type, subType, horizontalType, handleRequestResponse }) => {
  const shouldRender = (item) => {
    if (item?.column.Header === "id") return false;
    return true;
  };

  return (
    <TableRow>
      {row.cells.map((cell) =>
        shouldRender(cell) ? (
          <EnigmaTableCell
            actionType={row.original.type}
            key={cell.column.id}
            cell={cell}
            type={type}
            subType={subType}
            horizontalType={horizontalType}
            handleRequestResponse={handleRequestResponse}
          />
        ) : null
      )}
    </TableRow>
  );
};

Row.propTypes = {
  row: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  subType: PropTypes.string.isRequired,
};

export default Row;
