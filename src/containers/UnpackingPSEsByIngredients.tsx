import { Box, Tab, Tabs } from "@mui/material";
import { ingredientsDoneData, ingredientsTodoData } from "../utils/data";
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
  const [ingredientsTodo, setIngredientsTodo] = useState<Record<string, any>[]>(ingredientsTodoData);
  const [ingredientsDone, setIngredientsDone] = useState<Record<string, any>[]>(ingredientsDoneData);

  const [tab, setTab] = useState<number>(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  }

  const handleSelectIngredients = (ingredient: Record<string, any>, status: "TODO" | "DONE") => {
    if (status === "TODO") {
      setIngredientsTodo(ingredientsTodo.filter((i) => i.objectId !== ingredient.objectId));
      setIngredientsDone([ingredient, ...ingredientsDone]);
    } else if (status === "DONE") {
      setIngredientsDone(ingredientsDone.filter((i) => i.objectId !== ingredient.objectId));
      setIngredientsTodo([ingredient, ...ingredientsTodo]);
    }
  }

  return (
    <Box sx={{ width: '100%', display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={sx.tabsContainer}>
        <Tabs
          value={tab}
          textColor="primary"
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
      {tab === 0 && (
        <UnpackingPSEsByIngredientsForm
          ingredients={ingredientsTodo}
          onSelect={handleSelectIngredients}
          status="TODO"
        />
      )}
      {tab === 1 && (
        <UnpackingPSEsByIngredientsForm
          ingredients={ingredientsDone}
          onSelect={handleSelectIngredients}
          status="DONE"
        />
      )}
    </Box>
  )
}

export default UnpackingPSEsByIngredients;