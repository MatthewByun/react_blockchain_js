const contact = artifacts.require('HelloWorld');

module.exports = function (_deployer) {
  _deployer.deploy(contact);
};
