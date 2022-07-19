import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useTable, useSortBy } from "react-table";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

import EnigmaTableBodyRow from "./BodyRow";

const EnigmaTable = ({
  columns,
  data,
  type,
  subType,
  handleRequestResponse,
}) => {
  const memoizedColumns = useMemo(
    () =>
      columns?.content?.map((column) => {
        return {
          Header: column.name,
          accessor: column.name,
        };
      }),
    [columns.content]
  );

  const memoizedRows = useMemo(
    () =>
      data?.map((row) => {
        return {
          ...row,
          name: row.product,
        };
      }),
    [data]
  );

  const shouldRender = (item) => {
    if (item?.Header === "id") return false;
    return true;
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: memoizedColumns,
        data: memoizedRows,
      },
      useSortBy
    );

  return (
    <Table stickyHeader {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow align={"center"} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) =>
              shouldRender(column) ? (
                <TableCell
                  align={"center"}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                ></TableCell>
              ) : null
            )}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <EnigmaTableBodyRow
              row={row}
              subType={subType}
              type={type}
              {...row.getRowProps()}
              handleRequestResponse={handleRequestResponse}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

EnigmaTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default EnigmaTable;
