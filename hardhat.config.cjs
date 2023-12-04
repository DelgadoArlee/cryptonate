/* eslint-disable no-undef */
/** @type import('hardhat/config').HardhatUserConfig */

const RPC_URL = vars.get('RPC_URL');
const DONEE_ACCOUNT = vars.get('DONEE_ACCOUNT');

module.exports = {
  defaultNetwork: 'sepolia',
  networks: {
    hardhat: {},
    sepolia: {
      url: RPC_URL,
      accounts: [DONEE_ACCOUNT],
    },
  },
  solidity: '0.8.19',
};
