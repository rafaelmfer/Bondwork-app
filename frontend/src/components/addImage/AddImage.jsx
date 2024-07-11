import { TextField, InputAdornment, Box } from "@mui/material";
import { styled } from "@mui/system";

const Label = styled("label")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    color: theme.palette.neutrals.black,
    marginBottom: "4px",
}));

const BoxImage = () => {
    return <p>funcionando123</p>;
};

export function AddImage({
    id,
    label,
    iconLabel,
    iconLeft,
    onClickIconLeft,
    iconRight,
    onClickIconRight,
    onMouseOverIconRight,
    onMouseOutIconRight,
    placeholder,
    error,
    hint,
    disabled,
    value,
    type,
    onChange,
    sx,
}) {
    return (
        <Box
            sx={sx}
            aria-disabled={disabled} // ARIA attribute to indicate disabled state
            aria-invalid={error} // ARIA attribute to indicate error state
        >
            <Label htmlFor={id}>{label}</Label>
            <BoxImage />
        </Box>
    );
}
