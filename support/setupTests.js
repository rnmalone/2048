global.requestAnimationFrame = (cb) => {
    setTimeout(cb, 0);
};

const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

require('jest-enzyme');

configure({ adapter: Adapter() });
