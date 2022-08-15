class VNode {
    constructor(tagName) {
        this.tagName = tagName;
        this.children = [];
        this.innerHTML = "";
    }
    
    createElement(tagName){
        return new VDocument(tagName);
    }
    appendChild(vNode){
        if(vNode instanceof VNode){
            this.children = this.children || [];
            this.children.push(vNode);
        }
    }

}

class Queue extends Array{
    constructor(array=[]){
        super(array)
    }
    enq(el){
        this.push(el)
    }
    deq(){
        if(this.length > 0){
            return this.splice(0,1)[0];
        }
        return null;
    }
}

class VDocument extends VNode {
    constructor(){
        super('html')
    }
    render(){
        const getIndents = (n) => (new Array(n)).fill('\t').join(''),
        printTree = (node, level) => {
            if(!node){return;}
            const indents = getIndents(level),
            children = node.children || [];
            let tree = `${indents}<${node.tagName}>\n`;
            for (let i = 0; i < array.length; i++) {
                tree += printTree(children[i], level + 1);
                
            }
            if(!children.length && node.innerHTML) {
                tree += `${getIndents(level+1)}${node.innerHTML}\n`;
            }
            tree = `${indents}</${node.tagName}>\n`;

            return tree;
        };

        let tree = printTree(this, 0); 

        console.log(tree);
        
        return tree;
        
    }
}

export default VDocument;