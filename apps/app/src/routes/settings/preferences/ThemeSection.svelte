<script lang="ts">
  import { page } from "$app/state"
  import type { User } from "@repo/models"
  import { applyTheme } from "@/lib/themeHelper"
  import { trpc } from "@/lib/trpc/client"
  import { Card, Icon, snackbar } from "@repo/ui"
  import { onDestroy } from "svelte"

  type Theme = User["preferences"]["theme"]

  type Props = {
    theme?: Theme
  }

  let { theme }: Props = $props()

  const setTheme = async (newTheme: Theme) => {
    const currentTheme = theme
    theme = newTheme
    const { success, message } = await trpc(page).user.updatePreferences.mutate(
      { theme: newTheme },
    )

    if (success) {
      snackbar.success({ text: "Preferences saved" })
    } else {
      snackbar.error({ text: message })
      theme = currentTheme
    }
  }

  $effect(() => {
    const cleanup = applyTheme(theme ?? "system")
    onDestroy(cleanup)
  })
</script>

<Card>
  {#snippet header()}
    <h2>Theme</h2>
  {/snippet}
  <div class="theme-container">
    <div class="theme-item">
      <button
        class={`theme-light ${theme === "light" ? "selected" : ""}`}
        onclick={() => setTheme("light")}
      >
        <Icon color="warning" name="sun" size="4" />
      </button>
      <span class="label">Light</span>
    </div>
    <div class="theme-item">
      <button
        class={`theme-dark ${theme === "dark" ? "selected" : ""}`}
        onclick={() => setTheme("dark")}
      >
        <Icon color="white" name="moon" size="4" />
      </button>
      <span class="label">Dark</span>
    </div>
    <div class="theme-item">
      <button
        class={`theme-system ${theme === "system" ? "selected" : ""}`}
        onclick={() => setTheme("system")}
      >
        <div class="system-icons">
          <Icon color="warning" name="sun" size="4" />
          <Icon color="white" name="moon" size="4" />
        </div>
      </button>
      <span class="label">System</span>
    </div>
  </div>
</Card>

<style>
  .theme-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-4);
    max-width: 800px;
  }

  .theme-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .selected {
    border: 2px solid var(--secondary);
  }

  button {
    align-items: center;
    background-color: var(--surface-3);
    border-radius: var(--radius-box);
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    height: 10rem;
    justify-content: center;
    padding: var(--spacing-4);
    transition: all 0.2s ease-in-out;
    width: 100%;
  }

  button:hover {
    transform: scale(1.01);
    border: 2px solid var(--primary);
  }

  button:active {
    filter: brightness(0.9);
    transform: scale(0.99);
  }

  button:focus {
    outline: 3px solid var(--primary);
    outline-offset: 3px;
  }

  button:focus:not(:focus-visible) {
    outline: none;
  }

  .label {
    font-size: 0.8rem;
    font-weight: bold;
    margin-top: var(--spacing-2);
    text-transform: uppercase;
  }

  .theme-light {
    background-color: #fff;
  }

  .theme-dark {
    background-color: #a987f3;
  }

  .theme-system {
    background: linear-gradient(90deg, #fff 50%, #a987f3 50%);
  }

  .system-icons {
    align-items: center;
    display: flex;
    gap: var(--spacing-2);
    justify-content: space-around;
    width: 100%;
  }

  /* Mobile: single-column layout for ease of use */
  @media (max-width: 500px) {
    .theme-container {
      grid-template-columns: 1fr;
    }
    button {
      height: 8rem;
      padding: var(--spacing-2);
    }
    .label {
      font-size: 0.75rem;
    }
  }
</style>
