import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   transports: {
//     // [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
// })

export const config = getDefaultConfig({
  appName: 'BallonBid',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http()
  },
})