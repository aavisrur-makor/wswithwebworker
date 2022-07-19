import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { Typography, TableCell, Grid, Button } from "@material-ui/core";

import CallReceivedIcon from "@material-ui/icons/CallReceived";

const Cell = ({
  cell,
  type,
  fullscreen,
  handleRequestResponse,
  actionType,
}) => {
  const handleRequestResponseFunc = useCallback(
    (id, bool, type) => {
      handleRequestResponse(id, bool, type);
    },
    [handleRequestResponse]
  );
  const renderCell = () => {
    let { value } = cell;

    switch (cell.column.id) {
      case "product":
        return <Typography>{value}</Typography>;
      case "mtd":
      case "ytd":
        return <Typography>{value && value !== "NaN" && value}</Typography>;
      case "daily":
        if (value > 0) {
          return <Typography>{value} </Typography>;
        } else if (value <= 0) {
          return (
            <Typography>
              {value}
              {/* <CallReceivedIcon /> {value}% */}
            </Typography>
          );
        }
        break;
      default:
        return value !== undefined ? (
          <Typography> {value && value !== "NaN" && value}</Typography>
        ) : null;
    }
  };
  return (
    <TableCell
      align={"center"}
      style={{
        maxWidth:
          fullscreen === null && cell.value?.name === "id"
            ? "100px"
            : (type === "company_users" || type === "profiles") &&
              cell.value?.name !== "modules" &&
              cell.value?.name !== "widgets" &&
              "50px",
      }}
    >
      {renderCell()}
    </TableCell>
  );
};

Cell.propTypes = {
  cell: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
};

export default Cell;
