<script lang="ts">
  import Ahmad from "@/assets/testimonial-images/ahmad.jpg"
  import Alex from "@/assets/testimonial-images/alex.jpg"
  import Carlos from "@/assets/testimonial-images/carlos.jpg"
  import Chris from "@/assets/testimonial-images/chris.png"
  import David from "@/assets/testimonial-images/david.jpg"
  import Elin from "@/assets/testimonial-images/elin.jpg"
  import Hernan from "@/assets/testimonial-images/hernan.png"
  import James from "@/assets/testimonial-images/james.jpg"
  import John from "@/assets/testimonial-images/john.jpg"
  import Liam from "@/assets/testimonial-images/liam.jpg"
  import Lucia from "@/assets/testimonial-images/lucia.jpg"
  import Mark from "@/assets/testimonial-images/mark.jpg"
  import Marten from "@/assets/testimonial-images/marten.jpg"
  import Timbo from "@/assets/testimonial-images/timbo.jpg"
  import Section from "@/components/Section.svelte"
  import { Icon } from "@repo/ui"

  const siteName = "SkullTag"

  const testimonials = [
    {
      image: Elin,
      name: "Elin Johansen",
      text: `Using ${siteName} was a game changer for us with the Mailgun setup. 🚀`,
      stars: 5,
      verified: true,
    },
    {
      image: Lucia,
      name: "Lucia Fernández",
      text: "I really love how easy the Firebase integration has become with this!",
      stars: 5,
      verified: false,
    },
    {
      image: Marten,
      name: "Marten",
      text: "Super helpful tool. 👍",
      stars: 4,
      verified: true,
    },
    {
      image: James,
      name: "James Carter",
      text: `${siteName} saved me weeks. TypeScript is clean af.`,
      stars: 5,
      verified: true,
    },
    {
      image: Ahmad,
      name: "Ahmad Prasetyo",
      text: "Stripe working perfectly, highly recommend this.",
      stars: 5,
      verified: true,
    },
    {
      image: Carlos,
      name: "Carlos Silva",
      text: "Tailwind CSS = total revolution in workflow.",
      stars: 5,
      verified: true,
    },
    {
      image: John,
      name: "John Smith",
      text: "Just awesome, really. 😄",
      stars: 5,
      verified: true,
    },
    {
      image: David,
      name: "David Anderson",
      text: `Highly recommend ${siteName}. The structure is so intuitive and easy to follow.`,
      stars: 5,
      verified: true,
    },
    {
      image: Liam,
      name: "Liam O'Connor",
      text: "Efficiency totally redefined with Stripe already in there. So great!",
      stars: 5,
      verified: true,
    },
    {
      image: Mark,
      name: "Mark",
      text: "Just the Mailgun setup alone is worth it",
      stars: 4.5,
      verified: true,
    },
    {
      image: Chris,
      name: "Chris T",
      text: "Couldn't ask for more with the integration flexibility. 💪",
      stars: 5,
      verified: true,
    },
    {
      image: Alex,
      name: "Alex Kim",
      text: "It's good, does what it promises.",
      stars: 4,
      verified: true,
    },
    {
      image: Hernan,
      name: "Hernan Cortez",
      text: "Esta herramienta es increíble. Me ha ahorrado mucho tiempo.",
      stars: 5,
      verified: true,
    },
    {
      image: Timbo,
      name: "Timbo Sheng",
      text: "This product is the real deal. The time saving is unbelievable.",
      stars: 5,
      verified: true,
    },
    {
      name: "Maria Lopez",
      text: "Mailgun integration is love! Makes everything easier.",
      stars: 5,
      verified: true,
    },
    {
      name: "Nina Bauer",
      text: "Not exactly what I wanted but everything simpler now, big thanks!",
      stars: 4,
      verified: false,
    },
    {
      name: "Priya Kapoor",
      text: "Beyond expectations, strong TypeScript and was ready from the start. A real time-saver!",
      stars: 5,
      verified: true,
    },
    {
      name: "Tomas Garcia",
      text: "Responsive layouts with DaisyUI? Just fantastic. 🌟",
      stars: 5,
      verified: false,
    },
    {
      name: "Sara Nilsson",
      text: `Getting a Next.js project has never been smoother. <3 ${siteName}.`,
      stars: 5,
      verified: true,
    },
    {
      name: "Johan Larsson",
      text: "Firebase and TypeScript are big help, huge help indeed.",
      stars: 4.5,
      verified: false,
    },
    {
      name: "Ana Rodriguez",
      text: "Exceptional! The time saving with Stripe and Tailwind CSS is incredible.",
      stars: 5,
      verified: true,
    },
    {
      name: "Maya Singh",
      text: "Essential tools. Mailgun and TypeScript are must-haves for any developer.",
      stars: 5,
      verified: false,
    },
    {
      name: "Hiroshi Tanaka",
      text: "incredible value. productivity's up... next.js.",
      stars: 5,
      verified: true,
    },
    {
      name: "ravi",
      text: "Great for startups. Firebase and Tailwind CSS make things so easy.",
      stars: 4.5,
      verified: false,
    },
    {
      name: "Sophia Martinez",
      text: "Really helpful tool! 🌈",
      stars: 4.5,
      verified: true,
    },
    {
      name: "lukas bauer",
      text: "All I needed, tbh.",
      stars: 4.5,
      verified: false,
    },
    {
      name: "Hannah Jensen",
      text: "Support is top-notch. Features are excellent. 🫶",
      stars: 5,
      verified: true,
    },
    {
      name: "Lena",
      text: "DECENT",
      stars: 5,
      verified: false,
    },
    {
      name: "miguel",
      text: "dude, you're underselling this. it must've taken you ages to get it this clean.",
      stars: 5,
      verified: true,
    },
    {
      name: "Oliver",
      text: "just get it and don't look back",
      stars: 5,
      verified: false,
    },
    {
      name: "Emily davis",
      text: "A lifesaver! Everything's ready to go from the start.",
      stars: 5,
      verified: true,
    },
    {
      name: "Michael Nguyen",
      text: "Works great, definitely recommend.",
      stars: 4,
      verified: false,
    },
    {
      name: "Ali Hassan",
      text: "Helped a lot to have good tool ready.",
      stars: 4.5,
      verified: true,
    },
    {
      name: "Marta Kowalski",
      text: "Email automation so much easier now, big improvement.",
      stars: 5,
      verified: false,
    },
    {
      name: "Juan Perez",
      text: "Buenísimo! Mejoró todo.",
      stars: 5,
      verified: true,
    },
    {
      name: "Emma Larsen",
      text: "Simple y eficaz. Muy bueno. 😊",
      stars: 5,
      verified: false,
    },
    {
      name: "Noah Fischer",
      text: "where tf has this been all my life?",
      stars: 5,
      verified: true,
    },
    {
      name: "Lara R",
      text: "Great setup, really helps a lot.",
      stars: 5,
      verified: false,
    },
    {
      name: "Hassan Ali",
      text: "Awesome tool, very helpful.",
      stars: 5,
      verified: true,
    },
    {
      name: "Alicia",
      text: "Facilita mucho el trabajo. ¡Recomendado!",
      stars: 5,
      verified: false,
    },
    {
      name: "🎫 Are you paying attention?",
      text: "If you see this, use GOLDENTICKET for $70 off. There's only 10 golden tickets 😉",
      stars: 0,
      verified: false,
    },
  ]

  const shuffledTestimonials = [...testimonials].sort(() => Math.random() - 0.5)

  const rowCount = 4
  const rows = Array.from({ length: rowCount }, (_, i) =>
    shuffledTestimonials.slice(i * 10, i * 10 + 10),
  )
</script>

<Section id="testimonials" noAnimate title="Our customers love us 🥰">
  <div class="testimonial-container">
    {#each rows as row, rowIndex}
      <div
        class="testimonial-row {rowIndex % 2 === 0
          ? 'justify-end animate-pan-right'
          : 'justify-start animate-pan-left'}"
      >
        {#each row as testimonial}
          <div
            class="testimonial-card"
            style="min-width: {Math.floor(Math.random() * 100 + 280)}px;"
          >
            <div class="testimonial-header">
              {#if testimonial.image}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  width="64"
                  height="64"
                  class="testimonial-img"
                />
              {/if}
              <div class="testimonial-info {testimonial.image ? 'ml-4' : ''}">
                <div class="testimonial-name-row">
                  {#if testimonial.verified}
                    <Icon name="shield-check" />
                  {/if}
                  <h3 class="testimonial-name">{testimonial.name}</h3>
                </div>
                <div class="testimonial-stars">
                  {#each Array(Math.floor(testimonial.stars)) as _, star (star)}
                    <svg
                      class="star-icon"
                      viewBox="0 0 24 24"
                      class:text-yellow={true}
                    >
                      <path
                        d="M12 .587l3.668 7.429 8.332 1.2-6.064 5.893 1.464 8.591L12 18.896l-7.4 4.804 1.464-8.591L.464 9.216l8.332-1.2L12 .587z"
                      />
                    </svg>
                  {/each}
                  {#if testimonial.stars % 1 !== 0}
                    <svg class="star-icon text-yellow" viewBox="0 0 24 24">
                      <path
                        d="M12 .587L8.332 8.016 0 9.216l6.064 5.893L4.6 23.7 12 18.896V.587z"
                      />
                    </svg>
                  {/if}
                </div>
              </div>
            </div>
            <p class="testimonial-text">{testimonial.text}</p>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</Section>

<style>
  @keyframes pan-right {
    0% {
      transform: translateX(calc(-100% + 100vw));
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(calc(-100% + 100vw));
    }
  }
  @keyframes pan-left {
    0% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(calc(-100% + 100vw));
    }
    100% {
      transform: translateX(0%);
    }
  }
  .animate-pan-right {
    animation: pan-right 120s cubic-bezier(0.15, 0, 0.85, 1) infinite;
  }
  .animate-pan-left {
    animation: pan-left 120s cubic-bezier(0.15, 0, 0.85, 1) infinite;
  }

  .testimonial-container {
    position: relative;
    width: 100vw;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
    padding: 2rem 0;
  }
  .testimonial-row {
    display: flex;
    flex-direction: row;
    width: fit-content;
    gap: 1rem;
    padding: 0 1rem;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .testimonial-card {
    background-color: var(--surface-200, #f0f0f0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: var(--radius-box, 1rem);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .testimonial-header {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .testimonial-img {
    border-radius: var(--radius-box, 1rem);
  }
  .ml-4 {
    margin-left: 1rem;
  }
  .testimonial-info {
    display: flex;
    flex-direction: column;
  }
  .testimonial-name-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .testimonial-name {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }
  .testimonial-stars {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
  }
  .star-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
  }
  .text-yellow {
    fill: #fcd34d;
  }
  .testimonial-text {
    color: #4b5563;
    margin-top: 1rem;
    text-align: justify;
  }
</style>
