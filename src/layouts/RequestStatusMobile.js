import React from "react";
import { TableCell, ButtonGroup, useMediaQuery, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { LoadingButton } from "@mui/lab";

import { requestStatusColor } from "../styles/statusColor";

export const RequestStatusMobile = ({
  row,
  loading,
  handleConfirmation,
  handleRejection,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <TableCell
        className="extra-cell"
        colSpan={isMobile ? 4 : 5}
        sx={{ padding: 1 }}
      >
        <ButtonGroup
          variant="contained"
          sx={{
            width: "100%",
            height: 35,
            boxShadow: "none",
          }}
        >
          {row.status === "Pending" && (
            <>
              <LoadingButton
                onClick={(e) => handleConfirmation(e, row.id)}
                loading={loading[row.id]?.confirm}
                variant="contained"
                color="success"
                sx={{ width: "100%" }}
              >
                <FontAwesomeIcon icon={faCheck} size="xl" />
              </LoadingButton>
              <LoadingButton
                onClick={(e) => handleRejection(e, row.id)}
                loading={loading[row.id]?.reject}
                variant="contained"
                color="error"
                sx={{ width: "100%" }}
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
    </>
  );
};
