import { Swarm } from 'swarm-sdk'

const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POST':
      return state.concat([action.data])
    case 'DELETE_POST':
      return state.filter((post) => post.id !== action.id)
    case 'EDIT_POST':
      return state.map((post) => post.id === action.id ? { ...post, editing: !post.editing } : post)
    case 'UPDATE':
      return state.map((post) => {
        if (post.id === action.id) {
          return {
            ...post,
            title: action.data.newTitle,
            message: action.data.newMessage,
            editing: !post.editing
          }
        } else return post;
      });
    case 'INFO_POST':
      testSDK();
      return state;
    default:
      return state;
  }
}
export default postReducer;


async function testSDK () {
  let sdk = await Swarm.create('https://api-stage.swarm.fund');
  //let page = await sdk.horizon.balances.getPage();

  let { wallet, recoverySeed } = await sdk.api.wallets.create(
      'daniel@swarm.fund',
      'MyPassw0rd'
  );

  await sdk.api.wallets.get();
  // Get the confirmation token from email


  console.log('sdk', sdk)
}