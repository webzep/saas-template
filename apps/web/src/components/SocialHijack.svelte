<script lang="ts">
  import Section from "@/components/Section.svelte"
  import Amazon from "@/assets/logos/amazon.png"
  import Google from "@/assets/logos/google.png"
  import Meta from "@/assets/logos/meta.png"
  import Microsoft from "@/assets/logos/microsoft.png"

  const clientLogos = [
    { alt: "Amazon", scale: 1, src: Amazon },
    { alt: "Google", scale: 1, src: Google },
    { alt: "Meta", scale: 0.8, src: Meta },
    { alt: "Microsoft", scale: 0.8, src: Microsoft },
  ]
</script>

<Section
  id="social-proof"
  bg="surface-2"
  noAnimate
  title="Used by the best in the industry"
  smallTitle
>
  <div class="social-logos">
    {#each clientLogos as logo, index (index)}
      <div class="logo-wrapper">
        <img
          alt={logo.alt}
          class="logo"
          src={logo.src}
          style={`height: calc(3.5rem * ${logo.scale})`}
        />
      </div>
    {/each}
  </div>
</Section>

<style>
  .social-logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-8);
    flex-direction: column;
  }
  @media (min-width: 640px) {
    .social-logos {
      flex-direction: row;
      transform: scale(1);
    }
  }

  .logo-wrapper {
    filter: contrast(0);
  }

  .logo {
    width: auto;
  }
</style>
