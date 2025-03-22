<script lang="ts">
  import { renderRichText, type ISbRichtext } from "@storyblok/svelte"

  type Props = {
    content?: ISbRichtext
  }

  let { content }: Props = $props()

  let html = $derived(
    renderRichText((content as unknown as ISbRichtext) ?? undefined),
  )
</script>

<div class="richtext">
  {@html html}
</div>

<style>
  .richtext {
    margin: 0 auto;
    padding: var(--spacing-4);
  }

  /* Set lists further in */
  :global(.richtext ul),
  :global(.richtext ol) {
    padding-left: var(--spacing-6);
  }

  :global(.richtext img) {
    display: flex;
    margin: var(--spacing-4) auto;
    border-radius: var(--radius-box);
  }

  :global(h1) {
    font-size: 2.25rem;
  }

  :global(h2) {
    font-size: 1.875rem;
  }
</style>
