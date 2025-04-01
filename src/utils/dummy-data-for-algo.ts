// example of data structure for the algorithm
const pses = [
	{
		objectId: "pse01",
		unpackingProgress: [
			{ supplierItem: { objectId: "si01" }, status: "TODO" }
		]
	},
	{
		objectId: "pse02",
		unpackingProgress: [
			{ supplierItem: { objectId: "si01" }, status: "DONE" },
			{ supplierItem: { objectId: "si02" }, status: "TODO" }
		]
	},
	{
		objectId: "pse03",
		unpackingProgress: [
			{ supplierItem: { objectId: "si01" }, status: "TODO" },
			{ supplierItem: { objectId: "si02" }, status: "DONE" },
			{ supplierItem: { objectId: "si03" }, status: "TODO" }
		]
	}
]

const ingredients = [
	{
		objectId: "si01",
		productionStepExecutions: [
			{ objectId: "pse01", status: "TODO" },
			{ objectId: "pse02", status: "DONE" },
			{ objectId: "pse03", status: "TODO" }
		]
	},
	{
		objectId: "si02",
		productionStepExecutions: [
			{ objectId: "pse02", status: "TODO" },
			{ objectId: "pse03", status: "DONE" }
		]
	},
	{
		objectId: "si03",
		productionStepExecutions: [
			{ objectId: "pse03", status: "TODO" }
		]
	}
]

const ingredientsToDo = [
	{
		objectId: "si01",
		productionStepExecutions: [
			// { objectId: "pse01", status: "TODO" },
      { ...pses[0], status: "TODO" },
			// { objectId: "pse03", status: "TODO" }
      { ...pses[2], status: "TODO" }
		]
	},
	{
		objectId: "si02",
		productionStepExecutions: [
			// { objectId: "pse02", status: "TODO" },
      { ...pses[1], status: "TODO" },
		]
	},
	{
		objectId: "si03",
		productionStepExecutions: [
			// { objectId: "pse03", status: "TODO" }
      { ...pses[2], status: "TODO" }
		]
	}
]

const ingredientsDone = [
	{
		objectId: "si01",
		productionStepExecutions: [
			// { objectId: "pse02", status: "DONE" }
      { ...pses[1], status: "DONE" },
		]
	},
	{
		objectId: "si02",
		productionStepExecutions: [
			// { objectId: "pse03", status: "DONE" }
      { ...pses[2], status: "DONE" }
		]
	}
]

// just to avoid eslint unused variables
console.log("🚀 ~ data:", {
  ingredients,
  pses,
  ingredientsToDo,
  ingredientsDone
})

const changeUnpackingIngredientsStatus = (ingredient: Record<string, any>, currentStatus = "TODO") => {
  const { objectId, productionStepExecutions } = ingredient;
  const newProductionStepExecutions = []
  for (const productionStepExecution of productionStepExecutions) {
    const unpackingProgress = productionStepExecution.unpackingProgress || []
    const newUnpackingProgress = unpackingProgress.map((unpacking:  Record<string, any>) => {
      if (unpacking.supplierItem.objectId === objectId) {
        return {
          ...unpacking,
          status: currentStatus === "TODO" ? "DONE" : "TODO"
        };
      }
      return unpacking;
    })
    productionStepExecution.unpackingProgress = newUnpackingProgress
    newProductionStepExecutions.push(productionStepExecution)
  }

  return newProductionStepExecutions
}

export const testSaveUnpackingIngredientsStatus = () => {
  const ingredient = ingredientsToDo[0]
  const currentStatus = "TODO"
  const newProductionStepExecutions = changeUnpackingIngredientsStatus(ingredient, currentStatus)
  console.log("🚀 ~ testSaveUnpackingIngredientsStatus:", newProductionStepExecutions)
}
