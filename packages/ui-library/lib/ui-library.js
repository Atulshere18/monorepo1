const { h, patch } = require('snabbdom');
const snabbdomClass = require('snabbdom/modules/class');
const snabbdomProps = require('snabbdom/modules/props');
const snabbdomStyle = require('snabbdom/modules/style');
const snabbdomEventlisteners = require('snabbdom/modules/eventlisteners');

const patch = patch;
const container = document.getElementById('app');

// Initialize Snabbdom with necessary modules
const snabbdomModules = [
    snabbdomClass,
    snabbdomProps,
    snabbdomStyle,
    snabbdomEventlisteners
];

let currentState = { count: 0 };
let updateListeners = [];

function updateState(newState) {
    currentState = { ...currentState, ...newState };
    updateListeners.forEach(listener => listener(currentState));
}

function mount(component) {
    // Execute mount function if defined
    if (component.mount) {
        component.mount();
    }
}

function template(state, props) {
    return h('div', [
        h('h1', state.count),
        h('button', { on: { click: () => updateState({ count: state.count + 1 }) } }, 'Add')
    ]);
}

function render(component) {
    const vnode = component.render();
    patch(container, vnode);
}

const exampleComponent = {
    render() {
        return template(currentState);
    },
    mount() {
        console.log('Component mounted');
    }
};

// Initial render
render(exampleComponent);
