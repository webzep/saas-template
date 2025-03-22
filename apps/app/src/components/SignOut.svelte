<script lang="ts">
  import { SignOut } from "@auth/sveltekit/components"
</script>

<SignOut>
  {#snippet submitButton()}
    <span>Sign out</span>
  {/snippet}
</SignOut>

<style>
  /* This is the form the button is wrapped in */
  :global(.signOutButton) {
    padding: var(--spacing-4) 0;
    width: 100%;
  }

  :global(.signOutButton button) {
    background: none;
    border-radius: var(--radius-field);
    border: none;
    color: var(--danger);
    cursor: pointer;
    font-size: 1rem;
    padding: var(--spacing-2) var(--spacing-4);
    width: 100%;
  }

  :global(.signOutButton button:hover) {
    background: color-mix(in srgb, var(--surface-dark) 90%, var(--surface-1));
  }
</style>
