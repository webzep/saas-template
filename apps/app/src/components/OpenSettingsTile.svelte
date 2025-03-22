<script lang="ts">
  import { page } from "$app/state"
  import { tooltip } from "@repo/ui"
</script>

<div class="account-container">
  <a class="account" href="/settings">
    <img
      alt="User avatar"
      src={page.data?.session?.user?.image ??
        `https://api.dicebear.com/9.x/thumbs/svg?seed=${Math.floor(Math.random() * 100000) + 1}&randomizeIds=true`}
      class="avatar"
    />
    <div class="user-info">
      <span class="user-name" title={page.data?.session?.user?.name} use:tooltip
        >{page.data?.session?.user?.name}</span
      >
      <span
        class="user-email"
        title={page.data?.session?.user?.email}
        use:tooltip>{page.data?.session?.user?.email}</span
      >
    </div>
  </a>
</div>

<style>
  .account-container {
    background: color-mix(in srgb, var(--on-surface-dark) 5%, transparent);
    border-radius: var(--radius-box);
    margin-top: auto;
    margin-bottom: 0;
  }

  .account {
    align-items: center;
    color: var(--on-surface-dark);
    display: flex;
    gap: var(--spacing-4);
    padding: var(--spacing-4);
    text-decoration: none;
  }

  .avatar {
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
    overflow: hidden;
  }

  .user-name {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-email {
    font-size: 0.7em;
    max-width: 200px;
    opacity: 0.6;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
