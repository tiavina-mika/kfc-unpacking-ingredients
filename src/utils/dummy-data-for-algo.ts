// example of data structure for the algorithm
const pses = [
	{
		objectId: "pse01",
		unpackingProgress: [
			{ supplierItem: "si01", status: "TODO" }
		]
	},
	{
		objectId: "pse02",
		unpackingProgress: [
			{ supplierItem: "si01", status: "DONE" },
			{ supplierItem: "si02", status: "TODO" }
		]
	},
	{
		objectId: "pse03",
		unpackingProgress: [
			{ supplierItem: "si01", status: "TODO" },
			{ supplierItem: "si02", status: "DONE" },
			{ supplierItem: "si03", status: "TODO" }
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
			{ objectId: "pse01", status: "TODO" },
			{ objectId: "pse03", status: "TODO" }
		]
	},
	{
		objectId: "si02",
		productionStepExecutions: [
			{ objectId: "pse02", status: "TODO" },
		]
	},
	{
		objectId: "si03",
		productionStepExecutions: [
			{ objectId: "pse03", status: "TODO" }
		]
	}
]

const ingredientsDone = [
	{
		objectId: "si01",
		productionStepExecutions: [
			{ objectId: "pse02", status: "DONE" }
		]
	},
	{
		objectId: "si02",
		productionStepExecutions: [
			{ objectId: "pse03", status: "DONE" }
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
