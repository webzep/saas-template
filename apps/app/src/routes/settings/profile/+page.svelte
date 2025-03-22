<script lang="ts">
  import { Card, Flex, Loader } from "@repo/ui"

  let { data } = $props()
  const profile = data.profile
</script>

<h1>Profile</h1>
{#if !profile}
  <Loader />
{:else}
  <Card>
    <Flex column align="center" gap="md">
      <div class="profile-image-wrapper">
        <img class="profile-image" src={profile.image} alt="Profile portrait" />
      </div>
      <div class="profile-details">
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
      </div>
    </Flex>
  </Card>
{/if}

<style>
  .profile-image-wrapper {
    position: relative;
    width: 160px;
    height: 160px;
    margin: 0 auto var(--spacing-4);
    border-radius: 50%;
    padding: var(--spacing-1);
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    transition: transform 0.3s ease;
  }

  .profile-image-wrapper:hover {
    transform: scale(1.05);
  }

  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .profile-details h2 {
    margin: var(--spacing-3) 0 var(--spacing-1);
    font-size: 2rem;
    color: var(--on-surface-1);
    font-weight: 700;
  }

  .profile-details p {
    margin: 0;
    font-size: 1rem;
    color: var(--secondary);
  }
</style>
