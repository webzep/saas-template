<script lang="ts">
  import type { Props as ButtonProps } from "./Button.svelte"
  import Button from "./Button.svelte"

  type Props = ButtonProps & {
    href?: string
    grow?: boolean
  }

  const { href, grow, ...rest }: Props = $props()

  const classNames = $derived(
    [...(rest.class ? [rest.class] : []), grow ? "grow" : ""]
      .filter(Boolean)
      .join(" "),
  )
</script>

{#if href}
  <a {href} class={classNames}>
    <Button {...rest} />
  </a>
{:else}
  <Button {...rest} />
{/if}

<style>
  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  .grow {
    display: flex;
    flex: 1;
  }
</style>
