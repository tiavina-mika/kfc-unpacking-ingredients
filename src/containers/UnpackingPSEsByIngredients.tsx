import { Box, Tab, Tabs } from "@mui/material";
import { ingredientsDone, ingredientsTodo } from "../utils/data";
import { useState } from "react";
import UnpackingPSEsByIngredientsForm from "./UnpackingPSEsByIngredientsForm";

const sx = {
  tabsContainer: {
    borderBottom: 1,
    borderColor: 'divider',
    display: "flex",
    alignSelf: "stretch",
  },
  tabs: {
    flex: 1,
    display: "flex",
    alignSelf: "stretch",
  },
  tab: {
    flex: 1,
    textAlign: "center",
    minWidth: "100%"
  }
}
const UnpackingPSEsByIngredients = () => {
  const [tab, setTab] = useState<number>(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  }

  return (
    <Box sx={{ width: '100%', display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={sx.tabsContainer}>
        {[`Produits à DÉConditionner (${ingredientsTodo.length})`, `PRODUITS DÉConditionnés (${ingredientsDone.length})`].map((title, index) => (
          <Tabs
            key={index}
            value={index}
            textColor="inherit"
            indicatorColor="primary"
            onChange={handleChange}
            sx={sx.tabs}
            aria-label="Unpacking Ingredients Tabs"
          >
            <Tab
              label={title}
              id={`unpacking-ingredients-${index}`}
              aria-controls={`unpacking-ingredientspanel-${index}`}
              sx={sx.tab}
            />
          </Tabs>
        ))}
      </Box>
      <UnpackingPSEsByIngredientsForm ingredients={ingredientsTodo} tab={tab} index={0} />
      <UnpackingPSEsByIngredientsForm ingredients={ingredientsDone} tab={tab} index={1} />
    </Box>
  )
}

export default UnpackingPSEsByIngredients;