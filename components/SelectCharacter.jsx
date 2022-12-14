/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Button, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import { transformCharacterData } from 'utils/constants'

const SelectCharacter = ({ setCharacterNFT, contract, abi }) => {
  const [characters, setCharacters] = useState([])
  const [loader, setLoader] = useState(true)
  const [loaderCard, setLoaderCard] = useState(false)
  const [gameContract, setGameContract] = useState(null)

  useEffect(() => {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const gameContract = new ethers.Contract(
        contract,
        abi,
        signer
      )
      setGameContract(gameContract)
    } else {
      console.log('Ethereum object not found')
    }
  }, [])

  useEffect(() => {
    const getCharacters = async () => {
      try {
        console.log('Getting contract characters to mint')
        setLoader(true)
        const charactersTxn = await gameContract.getAllDefaultCharacters()
        const characters = charactersTxn.map((characterData) => transformCharacterData(characterData))
        setCharacters(characters)
        setLoader(false)
      } catch (error) {
        console.error('Something went wrong fetching characters:', error)
      }
    }

    const onCharacterMint = async (sender, tokenId, characterIndex) => {
      console.log(
        `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
      )
      // Once our NFT character is minted, we can get our contract metadata
      // and set it to pass to the Arena.
      if (gameContract) {
        setLoader(true)
        const characterNFT = await gameContract.checkIfUserHasNFT()
        console.log('CharacterNFT: ', characterNFT)
        setCharacterNFT(transformCharacterData(characterNFT))
        setLoader(false)
      }
    }

    if (gameContract) {
      getCharacters()
      // We configure our NFT Minted Listener
      gameContract.on('CharacterNFTMinted', onCharacterMint)
    }

    return () => {
      // When the component is unmounted, we clean the listener
      if (gameContract) {
        gameContract.off('CharacterNFTMinted', onCharacterMint)
      }
    }
  }, [gameContract])

  const mintCharacterNFTAction = (characterId) => async () => {
    try {
      if (gameContract) {
        setLoaderCard(true)
        console.log('Minting character in progress...')
        const mintTxn = await gameContract.mintCharacterNFT(characterId)
        await mintTxn.wait()
        console.log('mintTxn:', mintTxn)
        setLoaderCard(false)
      }
    } catch (error) {
      console.warn('MintCharacterAction Error:', error)
      setLoaderCard(false)
    }
  }

  return (
    <Flex
      direction={'column'}
      align={'center'}
      w={'100%'}
    >
      <Flex
        align={'center'}
        justify={'center'}
        my={10}
      >
        <Text
          as={'h2'}
          fontSize={'2xl'}
          fontStyle={'italic'}
          bgGradient={'linear(to-r, blue.300, blue.500)'}
          bgClip='text'
        >
        <center><img src="https://media3.giphy.com/media/rfsjVNg3qVnvn86uvz/giphy.gif?cid=790b7611bad85e0ba4903e687fb52b6e0c846c90c9edbc2c&rid=giphy.gif&ct=s" ></img></center>
        <center>Mint Your NFT. Choose wisely. </center>
        </Text>
      </Flex>
      {loader || loaderCard
        ? (
          <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            w={'100%'}
            mt={10}
          >
            <Spinner
              thickness='6px'
              speed='0.45s'
              emptyColor='blue.100'
              color='blue.500'
              size='xl'
            />
            <Text
              mt={2.5}
            >
              {loader && 'Loading Characters'}
              {loaderCard && 'Mint NFT'}
            </Text>
          </Flex>
          )
        : (
          <Flex
            direction={'row'}
            wrap={'wrap'}
            align={'center'}
            justify={'center'}
            w={'100%'}
          >
            {characters.map((character, index) => {
              // console.log('character', character)
              return (
                <Flex
                  key={character.name}
                  direction={'column'}
                  align={'center'}
                  justify={'center'}
                  w={'300px'}
                  borderRadius={10}
                  bgGradient='linear(to-r, blue.500, blue.700)'
                  p={3}
                  mb={10}
                  mx={2}
                  cursor={'pointer'}
                  position={'relative'}
                  _hover={{
                    boxShadow: '0px 0px 10px 0px'
                  }}
                >
                  <Image
                    src={character.imageURI}
                    alt={character.name}
                    boxSize='100%'
                  />
                  <Flex
                    justify={'space-between'}
                    w={'100%'}
                    py={5}
                  >
                    <Flex
                      direction={'column'}
                      align={'flex-start'}
                      justify={'flex-start'}
                      color={'white'}
                    >
                      {/* <Text>{character.name}</Text> */}
                      <Text>??? {character.hp}</Text>
                      <Text>??? {character.attackDamage}</Text>
                      <Text>???? {character.shield}</Text>
                    </Flex>
                    <Flex
                      align={'center'}
                      justify={'center'}
                    >
                      <Button
                        variant={'outline'}
                        color={'white'}
                        _hover={{
                          color: 'blue.200'
                        }}
                        onClick={mintCharacterNFTAction(index)}
                      >
                        {`Mint ${character.name}`}
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              )
            })
          }</Flex>
          )
      }

    </Flex>
  )
}

export default SelectCharacter
