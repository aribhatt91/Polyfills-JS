const makeComponent = (tag) => (attributes, children) => {
    if(!attributes || !attributes.id) {
        throw new Error('Components need an id')
    }

    return {
        tag,
        attributes,
        children
    };
}

const setAttributes = (element, attributes) => {
    if(!element || !attributes){
        return
    }
    for(let [key, value] of attributes) {
        element.setAttribute(key, value);
    }
}

const renderer = ({tag, children=[], attributes={}}) => {
    var el = document.createElement(tag);
    setAttributes(el, attributes);
    children.forEach(c => {
        if(typeof c === 'string') {
            el.appendChild(document.createTextNode(c))
        }else {
            el.appendChild(renderer(c));
        }
    })
    return el;
}

const diffAndRender = (previousNode, newNode) => {}

const div = makeComponent('div'),
p = makeComponent('p'),
h1 = makeComponent('h1');

const app = state => (
    div({id: 'main'}, [
        div({id: 'header'}, [
            h1({id: 'title'}, ['Hello!']),
            p({id: 'text'}, ['This is some text.'])
        ])
    ])
)