import contractJson from 'utils/abis/MyEpicGame.json'

const CONTRACT = {
  MY_EPIC_GAME: {
    ADDRESS: '0xFFe0C266d6687f741192A4413431CB460A9132b1',
    ABI: contractJson.abi
  }
}

export const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber()
  }
}

// export const transformBossData = (bossData) => {
//   return {
//     name: bossData.name,
//     imageURI: bossData.imageURI,
//     hp: bossData.hp.toNumber(),
//     maxHp: bossData.maxHp.toNumber(),
//     attackDamage: bossData.attackDamage.toNumber()
//   }
// }

export default CONTRACT
