<script lang="ts">
  type Props = {
    /** Color of the loader dots */
    color?: string
    /** Size of the loader (in em units) */
    size?: "sm" | "md" | "lg" | "xl"
  }

  const { color = "currentColor", size = "md" }: Props = $props()

  const sizes = {
    sm: "0.5rem",
    md: "0.8rem",
    lg: "1.2rem",
    xl: "1.6rem",
  }

  let dotSize = $derived(sizes[size])
</script>

<div
  class="loader"
  role="status"
  aria-live="polite"
  aria-label="Loading"
  style="--loader-color: {color}; --dot-size: {dotSize}"
>
  <span class="dot"></span>
  <span class="dot"></span>
  <span class="dot"></span>
</div>

<style>
  .loader {
    align-items: center;
    display: inline-flex;
    justify-content: center;
  }
  .dot {
    animation: loader-bounce 0.6s infinite alternate;
    background: var(--loader-color, currentColor);
    border-radius: 50%;
    height: var(--dot-size);
    width: var(--dot-size);
    margin: 0 calc(var(--dot-size) * 0.25);
  }
  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes loader-bounce {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-50%);
      opacity: 0.3;
    }
  }
</style>
