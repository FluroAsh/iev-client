import React from "react";
import { TableCell, ButtonGroup } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const BookingStatusLarge = ({
  row,
  loading,
  handlePayClick,
  handleCancelClick,
}) => {
  return (
    <TableCell
      className="extra-cell"
      align="center"
      style={{ background: "#f1f1f180" }}
    >
      <ButtonGroup
        variant="contained"
        sx={{
          width: "100%",
          height: 35,
          boxShadow: "none",
        }}
      >
        {row.status === "Approved" && (
          <LoadingButton
            sx={{ width: "100%" }}
            onClick={(e) => handlePayClick(e, row.id, row)}
            loading={loading[row.id]?.pay}
            variant="contained"
            color="success"
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
    </TableCell>
  );
};
