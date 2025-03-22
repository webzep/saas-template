<script lang="ts">
  import { onMount, type Snippet } from "svelte"

  type Props = {
    children?: Snippet
    bg?: "surface-1" | "surface-2" | "surface-3"
    id?: string
    noAnimate?: boolean
    maxWidth?: string
    title?: string
    smallTitle?: boolean
  }

  const {
    bg = "surface-1",
    id,
    noAnimate = false,
    children,
    maxWidth = "100%",
    title,
    smallTitle = false,
  }: Props = $props()

  let isVisible = $state(false)
  let hasAnimated = $state(false)
  let domRef: HTMLElement | null = null

  onMount(() => {
    if (domRef && !noAnimate) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              isVisible = true
              hasAnimated = true
            }
          })
        },
        { threshold: 0.5 },
      )
      observer.observe(domRef)

      return () => {
        if (domRef) {
          observer.unobserve(domRef)
        }
      }
    }
  })

  const inlineStyleString = `max-width: ${maxWidth};`
</script>

<section class="section {bg}" bind:this={domRef} style={inlineStyleString}>
  <div class="anchor" {id}></div>
  {#if title}
    <h2 class="title {smallTitle ? 'small' : ''}">{title}</h2>
  {/if}
  <div
    class="container {noAnimate ? '' : 'fade-in-section'} {isVisible
      ? 'is-visible'
      : ''}"
  >
    {@render children?.()}
  </div>
</section>

<style>
  h2 {
    font-size: 3.2rem;
    font-weight: bolder;
    margin-bottom: var(--spacing-6);
    text-align: center;
  }

  .small {
    font-size: 2.2rem;
  }

  .section {
    position: relative;
    padding: 3rem 1rem;
    width: 100%;
  }

  .surface-1 {
    background-color: var(--surface-1);
  }

  .surface-2 {
    background-color: var(--surface-2);
  }

  .surface-3 {
    background-color: var(--surface-3);
  }

  .anchor {
    position: absolute;
    top: -10vh;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 100%;
  }

  .fade-in-section {
    opacity: 0;
    transition:
      opacity 0.6s ease-out,
      transform 0.6s ease-out;
    transform: translateY(20px);
  }
  .fade-in-section.is-visible {
    opacity: 1;
    transform: none;
  }
</style>
