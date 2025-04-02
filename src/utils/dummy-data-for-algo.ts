// example of data structure for the algorithm
const initialPSEs = [
	{
		objectId: "pse01",
		unpackingProgress: [
			{ supplierItem: { objectId: "si01" }, status: "TODO" }
		],
    status: "Locked"
	},
	{
		objectId: "pse02",
		unpackingProgress: [
			{ supplierItem: { objectId: "si01" }, status: "DONE" },
			{ supplierItem: { objectId: "si02" }, status: "TODO" }
		],
    status: "Locked"
	},
	{
		objectId: "pse03",
		unpackingProgress: [
			{ supplierItem: { objectId: "si01" }, status: "TODO" },
			{ supplierItem: { objectId: "si02" }, status: "DONE" },
			{ supplierItem: { objectId: "si03" }, status: "TODO" }
		],
    status: "TODO",
  },
]

const pses = initialPSEs.map((pse, index) => {
  if (index === 1){
    return {
      ...pse,
      ulteriorStep: initialPSEs[0]
    }
  }
  if (index === 2){
    return {
      ...pse,
      ulteriorStep: initialPSEs[1]
    }
  }
  return pse
})

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

const changeUnpackingUlteriorStepToTodo = (pse: Record<string, any>) => {
  const { ulteriorStep } = pse
  if (ulteriorStep) {
    ulteriorStep.status = "TODO"
  }
  if (ulteriorStep?.ulteriorStep) {
    changeUnpackingUlteriorStepToTodo(ulteriorStep)
  }

  return ulteriorStep
}

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
    const allDone = newUnpackingProgress.every((unpacking: Record<string, any>) => unpacking.status === "DONE")
    if (allDone) {
      productionStepExecution.status = "DONE"
      const ulteriorStep = changeUnpackingUlteriorStepToTodo(productionStepExecution)
      console.log("🚀 ~ changeUnpackingIngredientsStatus ~ ulteriorStep:", ulteriorStep)
      
      if (productionStepExecution.ulteriorStep) {
        productionStepExecution.ulteriorStep = ulteriorStep
      }
    }

    newProductionStepExecutions.push(productionStepExecution)
  }

  return newProductionStepExecutions
}

export const testSaveUnpackingIngredientsStatus = () => {
  const ingredient = ingredientsToDo[1]
  const currentStatus = "TODO"
  const newProductionStepExecutions = changeUnpackingIngredientsStatus(ingredient, currentStatus)
  console.log("🚀 ~ testSaveUnpackingIngredientsStatus:", newProductionStepExecutions)
}
