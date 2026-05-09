import { CalpharkHeader } from "@/components/calphark/header"
import { CalpharkHero } from "@/components/calphark/hero"
import { CalpharkIndustries } from "@/components/calphark/industries"
import { CalpharkCapabilities } from "@/components/calphark/capabilities"
import { CalpharkTrust } from "@/components/calphark/trust"
import { CalpharkCTA } from "@/components/calphark/cta"
import { CalpharkFooter } from "@/components/calphark/footer"
import { SynthwaveBackground } from "@/components/calphark/synthwave-background"
import { CursorGlow } from "@/components/calphark/cursor-glow"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <SynthwaveBackground />
      <CursorGlow />
      <div className="relative z-10">
        <CalpharkHeader />
        <CalpharkHero />
        <CalpharkIndustries />
        <CalpharkCapabilities />
        <CalpharkTrust />
        <CalpharkCTA />
        <CalpharkFooter />
      </div>
    </main>
  )
}
