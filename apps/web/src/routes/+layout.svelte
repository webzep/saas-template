<script lang="ts">
  import { afterNavigate } from "$app/navigation"
  import Footer from "@/components/Footer.svelte"
  import Navbar from "@/components/Navbar.svelte"
  import "@phosphor-icons/web/bold"
  import "@phosphor-icons/web/fill"
  import "@phosphor-icons/web/light"
  import "@repo/design/app.css"
  import type { Snippet } from "svelte"
  import type { LayoutProps } from "./$types"

  type Props = LayoutProps & {
    children?: Snippet
  }

  let { children, data }: Props = $props()
  const { appURL, websiteURL } = data

  let containerRef: HTMLDivElement | null = null

  afterNavigate(() => {
    // Reset the scroll position - yeah this kinda sucks.
    if (containerRef) containerRef.scrollTop = 0
  })
</script>

<div class="container" bind:this={containerRef}>
  <Navbar baseURL={websiteURL} signInURL={`${appURL}/signin`} />
  {@render children?.()}
  <Footer />
</div>

<style>
  .container {
    align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: scroll;
    height: 100dvh;
    width: 100dvw;
  }
</style>
