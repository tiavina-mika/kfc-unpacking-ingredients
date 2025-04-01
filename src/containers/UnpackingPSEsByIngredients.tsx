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
    textAlign: "center",
    minWidth: "50%"
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
        <Tabs
          value={tab}
          textColor="inherit"
          indicatorColor="primary"
          onChange={handleChange}
          sx={sx.tabs}
          aria-label="Unpacking Ingredients Tabs"
        >
          {[`Produits à DÉConditionner (${ingredientsTodo.length})`, `PRODUITS DÉConditionnés (${ingredientsDone.length})`].map((title, index) => (
            <Tab
              key={index}
              label={title}
              sx={sx.tab}
            />
          ))}
        </Tabs>
      </Box>
      {tab === 0 && <UnpackingPSEsByIngredientsForm ingredients={ingredientsTodo} />}
      {tab === 1 && <UnpackingPSEsByIngredientsForm ingredients={ingredientsDone} />}
    </Box>
  )
}

export default UnpackingPSEsByIngredients;