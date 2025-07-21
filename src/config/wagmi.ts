import { createConfig, http } from 'wagmi'
import { sepolia, goerli, mainnet } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// WalletConnect project ID - you should replace this with your own
const projectId = 'your-walletconnect-project-id'

export const config = createConfig({
  chains: [mainnet, sepolia, goerli],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ 
      projectId,
      metadata: {
        name: 'PrivéFi',
        description: 'The Prestige Layer of Real-World Yield',
        url: 'https://privefi.xyz',
        icons: ['https://privefi.xyz/favicon.ico']
      }
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [goerli.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}