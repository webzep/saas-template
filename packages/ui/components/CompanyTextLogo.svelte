<script lang="ts">
  import { Icon } from "@repo/ui"

  type Props = {
    dark?: boolean
    small?: boolean
  }

  let { dark = false, small = false }: Props = $props()

  const iconSize = small ? "sm" : "md"
  const textSize = small ? "text-sm" : "text-md"

  const containerClasses = ["container", textSize].join(" ")
  const text1Classes = ["text-1", dark ? "dark" : ""].join(" ")
  const text2Classes = ["text-2", "text-primary"].join(" ")
</script>

<span class={containerClasses}>
  <div class="icon-container">
    <Icon bold color="primary" name="skull" size={iconSize} />
  </div>
  <span class={text1Classes}>Skull</span>
  <span class={text2Classes}>Tag</span>
</span>

<style>
  .icon-container {
    align-items: center;
    background: white;
    border-radius: var(--radius-field);
    display: flex;
    justify-content: center;
    margin-right: var(--spacing-2);
    padding: var(--spacing-1);
  }

  .container {
    align-items: center;
    display: flex;
	font-weight: bold;
    letter-spacing: 0.05em;
    margin-left: var(--spacing-2);
    margin: var(--spacing-4) 0;
    padding: 0 var(--spacing-4);
  }

  .text-1 {
    color: var(--on-surface-dark);
  }

  .text-2 {
    color: var(--primary);
  }

  .text-md {
    font-size: 1.5em;
  }

  .text-sm {
    font-size: 1em;
  }

  .dark {
    color: var(--on-surface-1);
  }

  .company-name span {
    font-weight: bold;
  }
</style>
