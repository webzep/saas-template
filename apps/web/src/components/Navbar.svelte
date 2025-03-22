<script lang="ts">
  import { page } from "$app/state"
  import {
    Button,
    CompanyTextLogo,
    Drawer,
    Icon,
    Link,
    SideMenu,
    type IconName,
    type NavGroup,
  } from "@repo/ui"

  type Props = {
    baseURL: string
    signInURL: string
  }

  const { baseURL, signInURL }: Props = $props()

  let isMobileMenuOpen = $state(false)

  const menuLinks = [
    { label: "Features", href: `${baseURL}/#features`, icon: "rocket" },
    { label: "Docs", href: `${baseURL}/docs`, icon: "book" },
    { label: "Blog", href: `${baseURL}/blog`, icon: "newspaper" },
    { label: "Pricing", href: `${baseURL}/#pricing`, icon: "money" },
  ]

  const navGroups: NavGroup[] = [
    {
      label: "",
      items: menuLinks.map(({ label, href, icon }) => ({
        label,
        path: href,
        icon: icon as IconName,
      })),
    },
  ]
</script>

<Drawer open={isMobileMenuOpen} onClose={() => (isMobileMenuOpen = false)}>
  <SideMenu activeUrl={page.url} {navGroups}>
    {#snippet header()}
      <CompanyTextLogo />
    {/snippet}
  </SideMenu>
</Drawer>

<header id="header">
  <nav class="navbar">
    <div class="navbar-start">
      <div class="hamburger">
        <Button
          aria-label="Toggle mobile menu"
          onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
          variant="text"
        >
          <Icon name="list" bold color="neutral" size="sm" />
        </Button>
      </div>
      <a href="/" aria-label="Go to the home page" class="home-link">
        <CompanyTextLogo small dark />
      </a>
    </div>
    <div class="navbar-center">
      {#each menuLinks as link (link.label)}
        <Link bold variant="text" href={link.href}>
          {link.label}
        </Link>
      {/each}
    </div>
    <div class="navbar-end">
      <Link href={signInURL} variant="primary">Sign In</Link>
    </div>
  </nav>
</header>

<style>
  #header {
    background-color: transparent;
    left: 0;
    margin: 0 auto;
    max-width: 1024px;
    padding: var(--spacing-1) var(--spacing-4);
    position: sticky;
    right: 0;
    top: var(--spacing-3);
    width: 100%;
    z-index: 50;
  }

  .navbar {
    align-items: center;
    background-color: color-mix(
      in srgb,
      var(--surface-1) 70%,
      var(--surface-3)
    );
    border-radius: var(--radius-box);
    border: 1px solid var(--border-1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-2) var(--spacing-4);
  }

  .navbar-start,
  .navbar-center,
  .navbar-end {
    display: flex;
    align-items: center;
  }

  .home-link {
    align-items: center;
    color: var(--on-surface-1);
    display: flex;
    font-size: calc(var(--font-scale) * 1rem);
    text-decoration: none;
  }

  .hamburger {
    display: none;
  }

  @media (max-width: 768px) {
    .navbar-center {
      display: none;
    }

    .hamburger {
      display: flex;
    }
  }
</style>
