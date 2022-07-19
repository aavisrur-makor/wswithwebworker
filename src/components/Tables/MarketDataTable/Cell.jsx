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
        return <Typography variant="h2">{value}</Typography>;
      case "spread":
        return (
          <Typography variant="h2">
            {value && value !== "NaN" && value}
          </Typography>
        );
      case "change_daily":
        if (value > 0) {
          return <Typography variant="h2"> </Typography>;
        } else if (value < 0) {
          return (
            <Typography variant="h2">
              {" "}
              <CallReceivedIcon /> {value}%
            </Typography>
          );
        }
        break;
      default:
        return value !== undefined ? (
          <Typography variant="h2">
            {" "}
            {value && value !== "NaN" && value && 2}
          </Typography>
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
  fullscreen: PropTypes.bool.isRequired,
  handleRequestResponse: PropTypes.func,
  actionType: PropTypes.string,
};

export default Cell;
