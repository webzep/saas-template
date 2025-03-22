<script>
  import { SignIn } from "@auth/sveltekit/components"
  import { Icon } from "@repo/ui"

  const providers = [
    { name: "Discord", provider: "discord", color: "#7289DA" },
    { name: "Facebook", provider: "facebook", color: "#3b5998" },
    { name: "GitHub", provider: "github", color: "#333" },
    { name: "Google", provider: "google", color: "#DB4437" },
    { name: "LinkedIn", provider: "linkedin", color: "#0077B5" },
    { name: "Twitter", provider: "twitter", color: "#1DA1F2" },
  ]
</script>

<div class="main">
  <div class="container">
    <h1>Sign In to Your Account</h1>
    <p>Only GitHub is supported for now.</p>
    <div class="buttons">
      {#each providers as { name, provider, color }}
        <SignIn class="signInButton {provider}" {provider}>
          {#snippet submitButton()}
            <Icon color="neutral" name={`${provider}-logo`} size="2" />
            <span>{name}</span>
          {/snippet}
        </SignIn>
      {/each}
    </div>
  </div>
</div>

<style>
  :global(body) {
    background: #f0f2f5;
    color: #333;
    font-family: sans-serif;
    margin: 0;
  }

  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1rem;
  }

  .container {
    background: #ffffff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 1.75rem;
    color: #333;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  :global(.signInButton) {
    display: block;
  }

  :global(.signInButton button) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid transparent;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition:
      background-color 0.3s,
      border-color 0.3s;
  }

  :global(.signInButton button:hover) {
    filter: brightness(0.95);
  }

  /* Provider-specific styles */
  :global(.discord button) {
    background-color: #7289da;
    color: #fff;
  }
  :global(.facebook button) {
    background-color: #3b5998;
    color: #fff;
  }
  :global(.github button) {
    background-color: #333;
    color: #fff;
  }
  :global(.google button) {
    background-color: #db4437;
    color: #fff;
  }
  :global(.linkedin button) {
    background-color: #0077b5;
    color: #fff;
  }
  :global(.twitter button) {
    background-color: #1da1f2;
    color: #fff;
  }
</style>
