export const addProductFormControls = [
    {
        name: "name",
        label: "Product Name",
        type: "text",
        placeholder: "Enter Product Name",
        componentType: "input"
    },
    {
        name: "minOrderQuantity",
        label: "Minimum Order Quantity",
        type: "text",
        placeholder: "Enter minumum order quantity",
        componentType: "input"
    },
    {
        name: "fiberComposition",
        label: "Fiber Composition",
        type: "text",
        placeholder: "Enter Fiber Composition",
        componentType: "input"
    },
    {
        name: "weaveType",
        label: "Weave Type",
        type: "text",
        placeholder: "Enter Weave Type",
        componentType: "input"
    },
    {
        name: "dimention1",
        label: "Dimention1",
        type: "number",
        placeholder: "Enter dimention1",
        componentType: "input"
    },
        {
        name: "dimention2",
        label: "Dimention2",
        type: "number",
        placeholder: "Enter dimention2",
        componentType: "input"
    },
    {
        name: "color",
        label: "Color",
        type: "text",
        placeholder: "Enter color",
        componentType: "input"
    },
    {
        name: "design",
        label: "Design",
        type: "text",
        placeholder: "Enter design",
        componentType: "input"
    },
    {
        name: "fringeStyle",
        label: "Fringe Style",
        componentType: "select",
        options: [
            {label: "Select Fringe Style", value: ""},
            {label: "Tasseled", value: "Tasselled"},
            {label: "Fringeless", value: "Fringeless"},
            {label: "Knotted", value: "Knotted"}
        ]
    },
    {
        name: "origin",
        label: "Origin",
        type: "text",
        placeholder: "Enter origin",
        componentType: "input"        
    },
    {
        name: "careInstruction",
        label: "Care Instruction",
        type: "text",
        placeholder: "Enter care Instruction",
        componentType: "input"        
    },
        {
        name: "category",
        label: "Category",
        componentType: "select",
        options: [
            {label: "Select Category", value: ""},
            {label: "Shawl", value: "Shawl"},
            {label: "Scarf", value: "Scarf"},
            {label: "Stole", value: "Stole"},
            {label: "Mufler", value: "Mufler"},
            {label: "Blanket", value: "Blanket"},
            {label: "Sweater", value: "Sweater"}
        ]
    },
]