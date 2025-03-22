<script lang="ts">
  import { Button, Card, Icon } from "@repo/ui"
  import type { User } from "@repo/schemas"

  // Updated to match user model subscription structure
  type Props = {
    userSubscription: User["subscription"]
    loading: boolean
    onManageSubscription: () => void
    onViewPlans: () => void
  }

  const {
    userSubscription,
    loading,
    onManageSubscription,
    onViewPlans,
  }: Props = $props()

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("en-AU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Unknown"

  const isActive = userSubscription?.status === "active"
  const isPastDue = userSubscription?.status === "past_due"

  const cancel_at_period_end = userSubscription?.cancel_at_period_end || false

  const getDaysRemaining = (endDate?: string) => {
    if (!endDate) return null
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = userSubscription?.current_period_end
    ? getDaysRemaining(userSubscription.current_period_end)
    : null
</script>

{#if userSubscription?.stripe_subscription_id && userSubscription?.status}
  <Card>
    <div
      class="subscription-card {isActive
        ? 'active'
        : isPastDue
          ? 'past-due'
          : ''}"
    >
      <div class="subscription-header">
        <div class="plan-badge">
          <Icon
            bold
            color={isActive ? "success" : "warning"}
            name={isActive ? "shield-check" : "warning-circle"}
            size="sm"
          />
          <span>{userSubscription.status.toUpperCase()}</span>
        </div>
        <h2 class="plan-name">
          {userSubscription.plan_name || "Subscription"}
        </h2>
      </div>

      <div class="subscription-details">
        <div class="details-section">
          <div class="detail-item">
            <Icon bold color="neutral" name="calendar" size="sm" />
            <div>
              <span class="detail-label"
                >{cancel_at_period_end ? "Cancels on" : "Renews on"}</span
              >
              <span class="detail-value"
                >{formatDate(userSubscription.current_period_end)}</span
              >
            </div>
          </div>

          {#if daysRemaining !== null}
            <div class="detail-item">
              <Icon bold color="neutral" name="clock" size="sm" />
              <div>
                <span class="detail-label">Time remaining</span>
                <span class="detail-value"
                  >{daysRemaining} {daysRemaining === 1 ? "day" : "days"}</span
                >
              </div>
            </div>
          {/if}

          <div class="detail-item">
            <Icon bold color="neutral" name="credit-card" size="sm" />
            <div>
              <span class="detail-label">Billing</span>
              <span class="detail-value">Monthly</span>
            </div>
          </div>
        </div>
      </div>
      <div class="action-section">
        <Button variant="primary" {loading} onclick={onManageSubscription}>
          Manage Subscription
        </Button>
      </div>
    </div>
  </Card>
{:else}
  <Card>
    <div class="no-subscription">
      <div class="message">
        <h2 class="message-title">
          <Icon name="info" size="lg" color="info" />
          No Active Subscription
        </h2>
        <p>You're currently on the free plan with limited features.</p>
      </div>
      <Button variant="primary" onclick={onViewPlans}>View Plans</Button>
    </div>
  </Card>
{/if}

<style>
  .message-title {
    align-items: center;
    display: flex;
    gap: var(--spacing-2);
  }

  .no-subscription {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    padding: var(--spacing-6);
  }

  .message {
    flex: 1;
  }

  .message h2 {
    font-size: 1.25rem;
    margin: 0;
  }

  .message p {
    color: var(--text-2);
    font-size: 0.875rem;
    margin: var(--spacing-2) 0 0;
  }

  /* Enhanced subscription card styles */
  .subscription-card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
    overflow: hidden;
    padding: 0 var(--spacing-6);
    position: relative;
  }

  .subscription-card.active {
    background: linear-gradient(
      135deg,
      rgba(var(--success-rgb), 0.08),
      transparent 70%
    );
    border-left: 4px solid var(--success);
  }

  .subscription-card.past-due {
    background: linear-gradient(
      135deg,
      rgba(var(--warning-rgb), 0.08),
      transparent 70%
    );
    border-left: 4px solid var(--warning);
  }

  .subscription-header {
    margin-bottom: 0;
  }

  .plan-badge {
    align-items: center;
    background-color: var(--surface-2);
    border-radius: var(--radius-full);
    display: inline-flex;
    font-size: 0.7rem;
    font-weight: 600;
    gap: var(--spacing-2);
    letter-spacing: 0.05em;
    margin-bottom: var(--spacing-2);
    padding: var(--spacing-1) var(--spacing-3) var(--spacing-1) 0;
    text-transform: uppercase;
  }

  .subscription-card.active .plan-badge {
    background-color: rgba(var(--success-rgb), 0.15);
    color: var(--success);
  }

  .subscription-card.past-due .plan-badge {
    background-color: rgba(var(--warning-rgb), 0.15);
    color: var(--warning);
  }

  .plan-name {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.01em;
  }

  .subscription-details {
    width: 100%;
  }

  .details-section {
    display: grid;
    gap: var(--spacing-4);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    width: 100%;
  }

  .detail-item {
    align-items: center;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    display: flex;
    gap: var(--spacing-3);
    height: 100%;
    padding: var(--spacing-4);
    transition: all 0.2s ease;
  }

  .detail-item:hover {
    border-color: rgba(var(--primary-rgb), 0.3);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }

  .detail-item > div {
    display: flex;
    flex-direction: column;
  }

  .detail-label {
    color: var(--text-2);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .detail-value {
    color: var(--text-1);
    font-size: 1rem;
    font-weight: 600;
    margin-top: 4px;
  }

  .action-section {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--spacing-2);
    width: 100%;
  }

  @media (max-width: 768px) {
    .action-section {
      justify-content: flex-start;
    }
  }

  @media (max-width: 480px) {
    .details-section {
      grid-template-columns: 1fr;
    }

    .no-subscription {
      flex-direction: column;
      text-align: center;
    }

    .subscription-card {
      padding: 0 var(--spacing-4);
      gap: var(--spacing-4);
    }

    .detail-item {
      padding: var(--spacing-3);
    }
  }
</style>
