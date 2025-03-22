<script lang="ts">
  import { CompanyTextLogo, Link, Icon } from "@repo/ui"

  const instagram = "https://instagram.com/skulltag"
  const facebook = "https://facebook.com/skulltag"
  const twitter = "https://twitter.com/skulltag"
</script>

<footer id="footer">
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-brand">
        <CompanyTextLogo />
        <p class="tagline">Your trusted partner in excellence.</p>
      </div>
      <div class="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><Link align="start" grow variant="text" href="/">Home</Link></li>
          <li>
            <Link align="start" grow variant="text" href="/about">About Us</Link
            >
          </li>
          <li>
            <Link align="start" grow variant="text" href="/services"
              >Services</Link
            >
          </li>
          <li>
            <Link align="start" grow variant="text" href="/contact"
              >Contact</Link
            >
          </li>
        </ul>
      </div>
      <div class="footer-social">
        <h3>Follow Us</h3>
        <ul>
          <li>
            <Link aria-label="Twitter" href={twitter} variant="text">
              <Icon name="twitter-logo" color="neutral" size="md" />
            </Link>
          </li>
          <li>
            <Link aria-label="Facebook" href={facebook} variant="text">
              <Icon name="facebook-logo" color="neutral" size="md" />
            </Link>
          </li>
          <li>
            <Link aria-label="Instagram" href={instagram} variant="text">
              <Icon name="instagram-logo" color="neutral" size="md" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>
        © {new Date().getFullYear()}
        SkullTag. All rights reserved.
      </p>
    </div>
  </div>
</footer>

<style>
  #footer {
    width: 100%;
    background-color: var(--surface-dark);
    color: var(--on-surface-dark);
    padding: var(--spacing-4) 0;
  }

  /* Center content container */
  .footer-container {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 var(--spacing-4);
  }

  .footer-content {
    align-items: flex-start;
    border-bottom: 1px solid var(--border-1);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    justify-content: space-between;
    margin-bottom: var(--spacing-4);
    padding-bottom: var(--spacing-4);
  }

  .footer-brand,
  .footer-links,
  .footer-social {
    flex: 1;
    min-width: 200px;
    margin-bottom: var(--spacing-4);
  }

  .footer-brand .tagline {
    margin-top: var(--spacing-2);
    font-size: calc(0.875rem);
  }

  .footer-links h3,
  .footer-social h3 {
    margin-bottom: var(--spacing-2);
    font-size: calc(1rem);
  }

  .footer-links ul,
  .footer-social ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li,
  .footer-social li {
    margin-bottom: var(--spacing-1);
  }

  .footer-social ul {
    display: flex;
  }

  .footer-bottom {
    text-align: center;
    font-size: calc(0.75rem);
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .footer-brand,
    .footer-links,
    .footer-social {
      margin-bottom: var(--spacing-4);
    }
  }
</style>
