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
  cardBody: {
    backgroundColor: "#fff"
  }
}
type Props = {
  ingredients: Record<string, any>[];
  tab: number;
  index: number;
}
const UnpackingPSEsByIngredientsForm = ({ tab, index, ingredients = [] }: Props) => {
  return (
    <Stack spacing={3} role="tabpanel" id={`unpacking-ingredientspanel-${tab}`} aria-labelledby={`unpacking-ingredients-${tab}`} hidden={tab !== index}>
      {ingredients.map((ingredient, index) => (
        <Stack key={index + ingredient.objectId} spacing={2} sx={sx.card}>
          {/* title */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Checkbox />
            <Typography variant="h4" fontWeight={600}>
              {ingredient.name} - {getPSEsGrossWeightSum(ingredient.productionStepExecutions)} kg
            </Typography>
          </Stack>

          {/* body */}
          <Stack spacing={2} sx={sx.cardBody}>
            {ingredient.productionStepExecutions.map((pse: any, subIndex: number) => (
              <Stack key={subIndex + index + pse.objectId} direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  {pse.grossWeight} kg ({pse.description})
                </Typography>
                <Typography variant="body2" fontWeight={600}>
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