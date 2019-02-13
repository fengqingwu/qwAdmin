let items = [
    {
        name: "id选择器",
        type: "input",
        key: "id",
        controlWidth: "600px",
        maxLength: 20
    },
    {
        name: "class选择器",
        type: "input",
        key: "class",
        maxLength: 255,
        controlWidth: "600px"
    },
    {
        name: "盒子样式",
        key: "style",
        type: "textarea",
        rows: 3,
        controlWidth: "600px"
    },
    {type:"br"}
]
let formData = {}
for(let item of items){
    if(item.type!="br")formData[item.key] = item.type.toLocaleLowerCase =="checkboxgroup"? [] :"";
}
let formBtnsStyle= "text-align:center;padding-top: 20px;";
let formBtns = [
    {
        type: "primary",
        size: "mini",
        label: "保存",
        size: "mini",
        style: "min-width: 88px"
    },
    {
        type: "danger",
        size: "mini",
        label: "重置",
        size: "mini",
        style: "min-width: 88px"
    },
    {
        size: "mini",
        label: "取消",
        size: "mini",
        style: "min-width: 88px"
    },
];
export default {
    qwGrid:{
        labelWidth: "120px",
        items: [
            ...items,
            {
                key: "rows",
                name: "行数",
                type: "inputNumber",
                controls: false,
                min: 1
            },
            {
                key: "columns",
                name: "列数",
                type: "inputNumber",
                controls: false,
                min: 1
            },
            // {
            //     key: "componentsObj",
            //     name: "组件配置器",
            //     type: "JsonOBj"
            // }
        ],
        formData: {
            ...formData,
            rows: 1,
            columns: 1,
            // componentsObj: {}
        },
        formBtnsStyle: formBtnsStyle,
        formBtns: formBtns
    }    
}