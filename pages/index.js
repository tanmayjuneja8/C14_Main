/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { ethers } from 'ethers'
import { Button, Flex, Text, Spinner, useToast, Accordion, App, AccordionItem,ChakraProvider, AccordionButton, AccordionIcon, Box, AccordionPanel, Image, Link } from '@chakra-ui/react'
import Layout from 'components/Layout'
import SelectCharacter from 'components/SelectCharacter'
import Arena from 'components/Arena'
import CONTRACT, { transformCharacterData } from 'utils/constants'

const CONTRACT_ADDRESS = CONTRACT.MY_EPIC_GAME.ADDRESS // > TJ
const CONTRACT_ABI = CONTRACT.MY_EPIC_GAME.ABI // > TJ

export default function Home () {
  const toast = useToast()
  const [loader] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('') // TJ
  const [characterNFT, setCharacterNFT] = useState(null)
  const [chainIdOk, setChainIdOk] = useState(false)

  const checkNetwork = async () => {
    try {
      if (window.ethereum.networkVersion !== '4') {
        setChainIdOk(false)
        toast({
          title: 'Wrong network.',
          description: 'You are not connected to the Rinkeby testnet!.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      } else {
        setChainIdOk(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log('Make sure you have metamask!')
        toast({
          description: 'Make sure you have metamask!',
          status: 'info',
          duration: 9000,
          isClosable: true
        })
        return
      } else {
        console.log('We have the ethereum object', ethereum)
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account:', account)
        setCurrentAccount(account)
        checkNetwork()
      } else {
        console.log('No authorized account found')
        toast({
          description: 'No authorized account found',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    } catch (error) {
      console.log(new Error(error))
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        toast({
          description: 'Get MetaMask!',
          status: 'info',
          duration: 9000,
          isClosable: true
        })
        return
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('Connected', accounts[0])
      toast({
        description: 'Connected!',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
      // enters our website for the first time.
      setCurrentAccount(accounts[0])
      checkNetwork()
    } catch (error) {
      console.log(new Error(error))
    }
  }

  const fetchNFTMetadata = async () => {
    console.log('Checking for Character NFT on address:', currentAccount)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    )

    const txn = await gameContract.checkIfUserHasNFT()
    console.log('txn', txn)
    if (txn.name) {
      console.log('User has character NFT')
      setCharacterNFT(transformCharacterData(txn))
    } else {
      console.log('No character NFT found')
    }
  }

  useEffect(() => {
    checkNetwork()
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    // We run this functionality only if we have our wallet connected.
    if (currentAccount) {
      console.log('CurrentAccount:', currentAccount)
      fetchNFTMetadata()
    }
  }, [currentAccount])

  const renderViews = () => {
    // Conecto Billetera
    if (!currentAccount) {
      return (
        <Button
          mt={10}
          w={'30%'}
          letterSpacing={1}
          borderRadius={'md'}
          bg={'gray.600'}
          color={'white'}
          boxShadow={'2xl'}
          _hover={{
            opacity: '.9',
            cursor: 'pointer'
          }}
          onClick={connectWallet}
          disabled={currentAccount}
        >
          {'Connect your Wallet'}
        </Button>
      )
    } else {
      if (currentAccount && !characterNFT) {
        return (
            <SelectCharacter
              setCharacterNFT={setCharacterNFT}
              contract={CONTRACT_ADDRESS}
              abi={CONTRACT_ABI}
            />
        )
      }

      if (currentAccount && characterNFT) {
        return (
            <Arena
              characterNFT={characterNFT}
              contract={CONTRACT_ADDRESS}
              abi={CONTRACT_ABI}
            />
        )
      }
    }
  }
  // <ChakraProvider theme={customTheme}>
  //     <App />
  // </ChakraProvider>

  return (
    <Layout
      contract={CONTRACT_ADDRESS}
      chain={chainIdOk}
      address={currentAccount}
      head={
        <Head>
          <title>C14</title>
          <meta name="description" content="C14 platform built with Next.js" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"></link>
        </Head>
      }
    >
      <Flex
        align={'center'}
        justify={'flex-start'}
        direction={'column'}
        w={'100%'}
        py={100}
      >

        <Flex
          align={'center'}
          justify={'center'}
          direction={'column'}
          w={'50%'}
        >
          <Text
            id='top'
            as='h1'
            fontSize={'3xl'}
            fontWeight={900}
            letterSpacing={'1px'}
          >
            {'Hey there! 👋'}
          </Text>
          <Text
            as='h3'
            my={5}
            fontSize={'5xl'}
            fontWeight={600}
            letterSpacing={'.5px'}
          >
          Welcome to C14! 
          </Text>
          <Accordion w={'100%'} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <Text
                      as={'h2'}
                      fontSize={30}
                      fontWeight={'bold'}>
                        Want to list your company?
                    <img src="https://thumbs.gfycat.com/TerribleVacantIndianrockpython-max-1mb.gif" width = "55" height = "55" align = "right"></img>
                    </Text>
                  </Box>
                  <AccordionIcon />
                  
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <center><img src="https://r2.community.samsung.com/t5/image/serverpage/image-id/2858216iF966CF430D380489/image-size/large?v=v2&px=999" ></img></center><br></br>
                <Text mb={5} as={'p'} fontSize={20}> <b></b> If you want to list your company at the C14 exchange, reach out to us at c14forthefuture@gmail.com. May the Greenhouse gases NOT be with you! <br/></Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <Text
                      as={'h2'}
                      fontSize={30}
                      fontWeight={'bold'}>
                        Want to sell non-C14 offsets?
                      <img src="https://thumbs.gfycat.com/TerribleVacantIndianrockpython-max-1mb.gif" width = "55" height = "55" align = "right"></img>
                    </Text>
                  </Box>
                  <AccordionIcon /> 
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} w={'100%'}>
                <center><img src="https://i.gifer.com/4M52.gif" align = "center" width = "350" height = "350"></img></center><br></br><br></br>
                <Text mb={5} as={'p'} fontSize={20}>It is necessary to have Metamask installed in your browser. <b>💸</b> <br/>(Make sure to connect to the Rinkeby testnet and transfer test ETH to interact with the application.)</Text>
                <Text mb={5} as={'p'} fontSize={20}>You can obtain test ETH on this <Link color={'blue.300'} href='https://faucets.chain.link/rinkeby' >link.</Link> <b>🤑</b></Text>
                <Text mb={5} as={'p'} fontSize={20}>You can choose any of the listed NFTs on the platform (keep in mind that not all are the same, they differ a lot in their attributes). <b>🦹</b> <br/> </Text>
                <Text mb={5} as={'p'} fontSize={20}>Mint your NFT and invite your friends to mint NFT and become a part of the amazing C14 community! <b>😎</b> </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {renderViews()}
        </Flex>

        {loader &&
            (
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
              >{'Mining'}</Text>
            </Flex>
            )
        }
      </Flex>
    </Layout>
  )
}
