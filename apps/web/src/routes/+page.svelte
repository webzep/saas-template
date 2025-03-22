<script lang="ts">
  import Hero from "@/components/Hero.svelte"
  import NoBrainer from "@/components/NoBrainer.svelte"
  import Pricing from "@/components/Pricing.svelte"
  import Savings from "@/components/Savings.svelte"
  import SocialHijack from "@/components/SocialHijack.svelte"
  import type { PageProps } from "./$types"
  import Features from "@/components/Features.svelte"
  import Testimonials from "@/components/Testimonials.svelte"
  import UseCases from "@/components/UseCases.svelte"
  import FAQS from "@/components/FAQS.svelte"
  import CTA from "@/components/CTA.svelte"
  import EmailSignup from "@/components/EmailSignup.svelte"

  let { data }: PageProps = $props()
  const { appURL } = data
</script>

<Hero />
<SocialHijack />
<Savings />
<EmailSignup />
<NoBrainer />
<Features />
<Testimonials />
<Pricing {appURL} />
<UseCases />
<CTA />
<FAQS />
