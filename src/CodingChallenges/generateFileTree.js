const mock = {
    fileType: 0,
    fileName: 'root',
    children: [
        {
            fileType: 0,
            fileName: 'Downloads',
            children: [
                {
                    fileType: 1,
                    fileName: 'hello',
                    extension: 'html'
                },
                {
                    fileType: 1,
                    fileName: 'style',
                    extension: 'css'
                }
            ]
        }
    ]
};


const generateFileTree = (rootObj) => {
    if(!rootObj || rootObj.fileType !== 0){return null;}

    let folder = document.createElement('ul'),
    children = rootObj.children || [];

    folder.className = 'folder'

    for (let i = 0; i < children.length; i++) {
        const fileObj = children[i],
        file = document.createElement('li');

        if(fileObj.fileType === 0){
            file.appendChild(generateFileTree(fileObj));
        }else {
            file.innerHTML = fileObj.fileName + '.' + fileObj.extension;
            file.setAttribute('data-exten', fileObj.extension);
        }

        file.setAttribute('data-type', fileObj.fileType);
        file.setAttribute('data-name', fileObj.fileName);

        folder.appendChild(file);
    }

    return folder;
}