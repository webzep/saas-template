<script lang="ts">
  import { Icon } from "@repo/ui"
</script>

<div class="success-container">
  <div class="success-content">
    <Icon name="check-circle" size="xl" color="success" />
    <h1>Subscription Updated Successfully!</h1>
    <p>Thank you for your subscription. Your new plan is now active.</p>
    <a href="/settings/subscriptions" class="back-link">
      Return to Subscriptions
    </a>
  </div>
</div>

<style>
  .success-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    padding: var(--spacing-8);
  }

  .success-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-4);
  }

  h1 {
    color: var(--success);
    font-size: 1.5rem;
    margin: 0;
  }

  p {
    color: var(--text-2);
    margin: 0;
  }

  .back-link {
    margin-top: var(--spacing-4);
    color: var(--primary);
    text-decoration: none;
  }

  .back-link:hover {
    text-decoration: underline;
  }
</style> 