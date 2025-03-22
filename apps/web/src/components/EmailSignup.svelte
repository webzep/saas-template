<script lang="ts">
  import { Button, Input, Alert } from "@repo/ui"
  import Section from "./Section.svelte"

  let email = $state("")
  let message = $state("")
  let status = $state<"idle" | "loading" | "success" | "error">("idle")

  let isLoading = $derived(status === "loading")
  let isSuccess = $derived(status === "success")
  let isError = $derived(status === "error")
  let showMessage = $derived(isSuccess || isError)

  async function handleSubmit(e: Event) {
    e.preventDefault()

    if (!email) return

    status = "loading"

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        status = "success"
        message = data.message
        email = ""
      } else {
        throw new Error(data.message || "Something went wrong")
      }
    } catch (error) {
      status = "error"
      message = error instanceof Error ? error.message : "Something went wrong"
      console.error("Subscription error:", error)
    }

    setTimeout(() => {
      status = "idle"
      message = ""
    }, 5000)
  }
</script>

<Section id="email-signup" noAnimate bg="surface-2" title="Stay up to date">
  <div class="content">
    <p class="subtitle">
      Get the latest updates, news, and special offers delivered directly to
      your inbox.
    </p>

    <form onsubmit={handleSubmit} class="form">
      <div class="input-group">
        <Input
          type="email"
          bind:value={email}
          placeholder="Your email address"
          required
          disabled={isLoading}
        />

        <Button type="submit" variant="primary" loading={isLoading}>
          Subscribe
        </Button>
      </div>

      <Alert collapsed={!showMessage} variant={isError ? "warning" : "success"}>
        {message}
      </Alert>

      <p class="disclaimer">
        We will never share your data or send you too many emails.
      </p>
    </form>
  </div>
</Section>

<style>
  .content {
    text-align: center;
  }

  .subtitle {
    color: var(--on-surface-3);
    margin-bottom: var(--spacing-8);
  }

  .form {
    max-width: 28rem;
    margin: 0 auto;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-4);
  }

  @media (min-width: 640px) {
    .input-group {
      flex-direction: row;
    }

    .input-group :global(button) {
      flex: 0 0 auto;
    }
  }

  .disclaimer {
    font-size: 0.75rem;
    color: var(--on-surface-3);
    margin-top: var(--spacing-3);
  }

  :global(.alert) {
    margin-bottom: var(--spacing-4);
  }
</style>
