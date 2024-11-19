import { WagmiProvider } from "wagmi";
import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { sepolia } from "viem/chains";
import Info from "./components/Info";
import { Toaster } from "sonner";

const queryClient = new QueryClient();
function App() {
  return (
    <main className="min-h-screen bg-gradient">
      <Toaster richColors closeButton position="bottom-right"/>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            showRecentTransactions={true}
            modalSize="compact"
            theme={lightTheme({
              accentColor: "#000",
              accentColorForeground: "white",
              borderRadius: "medium",
              fontStack: "system",
            })}
            initialChain={sepolia}
          >
            <Info />
            <Navbar />
            <Hero />
            <Footer />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </main>
  );
}

export default App;
