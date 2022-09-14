import contractJson from 'utils/abis/MyEpicGame.json'

const CONTRACT = {
  MY_EPIC_GAME: {
    ADDRESS: '0x2227cDC9bbF0f0B659fe09191Da0410c4733ec1B',
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
