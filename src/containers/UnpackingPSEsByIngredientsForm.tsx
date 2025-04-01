import { Checkbox, Stack, Typography } from "@mui/material";

const getPSEsGrossWeightSum = (productionStepExecutions = []) => {
  return productionStepExecutions.reduce((acc: number, pse: Record<string, any>) => acc + pse.grossWeight, 0);
}
const sx = {
  card: {
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#E3F2FD"
  },
  cardTitle: {
    fontWeight: 500,
    color: "#000",
    fontSize: "16px",
    lineHeight: 1.5
  },
  cardBody: {
    backgroundColor: "#fff",
    padding: "8px 16px",
    borderRadius: "8px",
  },
  pseLabel: {
    fontWeight: 400,
    color: "#555",
    fontSize: "16px",
    lineHeight: 1.5
  }
}
type Props = {
  ingredients: Record<string, any>[];
  onSelect?: (ingredient: Record<string, any>, status: "TODO" | "DONE") => void;
  status?: "TODO" | "DONE";
}
const UnpackingPSEsByIngredientsForm = ({ onSelect, status = "TODO", ingredients = [] }: Props) => {
  return (
    <Stack
      spacing={3}
    >
      {ingredients.map((ingredient, index) => (
        <Stack key={index + ingredient.objectId} spacing={2} sx={sx.card}>
          {/* title */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Checkbox
              checked={status === "DONE"}
              onChange={() => onSelect?.(ingredient, status)}
              sx={{
                color: "#1976D2",
                "&.Mui-checked": {
                  color: "#1976D2",
                },
              }}
            />
            <Typography variant="h4" sx={sx.cardTitle}>
              {ingredient.name} - {getPSEsGrossWeightSum(ingredient.productionStepExecutions)} kg
            </Typography>
          </Stack>

          {/* body */}
          <Stack spacing={2} sx={sx.cardBody}>
            {ingredient.productionStepExecutions.map((pse: any, subIndex: number) => (
              <Stack key={subIndex + index + pse.objectId} direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                <Typography variant="body2" sx={sx.pseLabel}>
                  {pse.grossWeight} kg ({pse.description})
                </Typography>
                <Typography variant="body2" sx={sx.pseLabel}>
                  {pse.uniqueCode}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}

export default UnpackingPSEsByIngredientsForm;