import React from "react";
import { TableCell, ButtonGroup } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const BookingStatusMobile = ({
  row,
  loading,
  handlePayClick,
  handleCancelClick,
}) => {
  return (
    <TableCell className="extra-cell" colSpan={5} sx={{ padding: 1 }}>
      {(row.status === "Approved" || row.status === "Pending") && (
        <ButtonGroup
          variant="contained"
          sx={{
            width: "100%",
            height: 35,
            boxShadow: "none",
            textAlign: "center",
          }}
        >
          {row.status === "Approved" && (
            <LoadingButton
              onClick={(e) => handlePayClick(e, row.id)}
              loading={loading[row.id]?.pay}
              variant="contained"
              color="success"
              sx={{ width: "100%" }}
            >
              {!loading[row.id]?.pay && "Pay"}
            </LoadingButton>
          )}

          <LoadingButton
            onClick={(e) => handleCancelClick(e, row.id)}
            loading={loading[row.id]?.cancel}
            variant="contained"
            color="error"
            sx={{ width: "100%" }}
          >
            Cancel
          </LoadingButton>
        </ButtonGroup>
      )}
    </TableCell>
  );
};
