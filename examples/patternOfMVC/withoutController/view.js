const view = function () {
    const modelObj = new Model(data);
    const modelValue = modelObj.modelData;
    const viewValue = modelObj.viewData;
    const controllerValue = modelObj.controllerData;

    const modelDescription = {
        title : modelValue.split(':')[0],
        contents : modelValue.split(':')[1]
    };

    const viewDescription = {
        title : viewValue.split(':')[0],
        contents : viewValue.split(':')[1]
    };

    const controllerDescription = {
        title : controllerValue.split(':')[0],
        contents : controllerValue.split(':')[1]
    };
    
    return `
        <div>
            <div>${modelDescription.title}</div>
            <div>${modelDescription.contents}</div>
        </div>
        <div>
            <div>${viewDescription.title}</div>
            <div>${viewDescription.contents}</div>
        </div>
        <div>
            <div>${controllerDescription.title}</div>
            <div>${controllerDescription.contents}</div>
        </div>
    `;
}

const render = function (htmlTag) {
    document.querySelector('body').innerHTML = htmlTag;
}

render(view())