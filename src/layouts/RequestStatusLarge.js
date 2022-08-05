import React from "react";
import { TableCell, ButtonGroup } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { LoadingButton } from "@mui/lab";

import { requestStatusColor } from "../styles/statusColor";

export const RequestStatusLarge = ({
  row,
  loading,
  handleConfirmation,
  handleRejection,
}) => {
  return (
    <TableCell
      className="extra-cell"
      align="center"
      style={{ background: "#f1f1f180" }}
    >
      <ButtonGroup
        variant="contained"
        sx={{ width: "100%", boxShadow: "none" }}
      >
        {row.status === "Pending" && (
          <>
            <LoadingButton
              onClick={(e) => handleConfirmation(e, row.id)}
              loading={loading[row.id]?.confirm}
              variant="contained"
              color="success"
              size="small"
              sx={{ width: "100%", height: 35 }}
            >
              <FontAwesomeIcon icon={faCheck} size="xl" />
            </LoadingButton>
            <LoadingButton
              onClick={(e) => handleRejection(e, row.id)}
              loading={loading[row.id]?.reject}
              variant="contained"
              color="error"
              size="small"
              sx={{ width: "100%", height: 35 }}
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </LoadingButton>
          </>
        )}
        {row.status === "Approved" && (
          <span
            style={{
              color: requestStatusColor[row.status],
            }}
          >
            Awaiting payment...
          </span>
        )}
        {row.status === "Paid" && (
          <span
            style={{
              color: requestStatusColor[row.status],
            }}
          >
            Paid
          </span>
        )}
        {row.status === "Cancelled" && (
          <span
            style={{
              color: requestStatusColor[row.status],
            }}
          >
            Cancelled
          </span>
        )}
        {row.status === "Rejected" && (
          <span
            style={{
              color: requestStatusColor[row.status],
            }}
          >
            Rejected
          </span>
        )}
      </ButtonGroup>
    </TableCell>
  );
};
