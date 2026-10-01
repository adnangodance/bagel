import { useState, type FormEvent, type KeyboardEvent } from 'react'
import './App.css'
import { MenuPage } from './MenuPage'

type Category = {
  id: string
  name: string
  emoji: string
}

type Restaurant = {
  id: string
  name: string
  cuisine: string
  emoji: string
  rating: number
  reviews: number
  deliveryTime: string
  fee: string
  accent: string
  gradient: string
  promo?: string
}

const categories: Category[] = [
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'burgers', name: 'Burgers', emoji: '🍔' },
  { id: 'sushi', name: 'Sushi', emoji: '🍣' },
  { id: 'mexican', name: 'Mexican', emoji: '🌮' },
  { id: 'thai', name: 'Thai', emoji: '🍜' },
  { id: 'dessert', name: 'Dessert', emoji: '🍰' },
  { id: 'healthy', name: 'Healthy', emoji: '🥗' },
  { id: 'coffee', name: 'Coffee', emoji: '☕' },
]

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Crust & Co.',
    cuisine: 'Pizza · Italian',
    emoji: '🍕',
    rating: 4.8,
    reviews: 1240,
    deliveryTime: '20–35 min',
    fee: '$0.99',
    accent: '#2d6a4f',
    gradient: 'linear-gradient(145deg, #2d6a4f 0%, #52b788 55%, #95d5b2 100%)',
    promo: '20% off',
  },
  {
    id: '2',
    name: 'Smokehouse Grill',
    cuisine: 'Burgers · American',
    emoji: '🍔',
    rating: 4.6,
    reviews: 892,
    deliveryTime: '25–40 min',
    fee: '$1.49',
    accent: '#9b2226',
    gradient: 'linear-gradient(145deg, #9b2226 0%, #e85d04 55%, #f4a261 100%)',
  },
  {
    id: '3',
    name: 'Sakura Lane',
    cuisine: 'Sushi · Japanese',
    emoji: '🍣',
    rating: 4.9,
    reviews: 2103,
    deliveryTime: '30–45 min',
    fee: '$2.49',
    accent: '#1d3557',
    gradient: 'linear-gradient(145deg, #1d3557 0%, #457b9d 55%, #a8dadc 100%)',
    promo: 'Free delivery',
  },
  {
    id: '4',
    name: 'Verde Bowl',
    cuisine: 'Healthy · Salads',
    emoji: '🥗',
    rating: 4.7,
    reviews: 654,
    deliveryTime: '15–25 min',
    fee: '$0.49',
    accent: '#40916c',
    gradient: 'linear-gradient(145deg, #1b4332 0%, #40916c 50%, #95d5b2 100%)',
  },
  {
    id: '5',
    name: 'Casa Norte',
    cuisine: 'Mexican · Tacos',
    emoji: '🌮',
    rating: 4.5,
    reviews: 1108,
    deliveryTime: '20–30 min',
    fee: '$1.29',
    accent: '#bc6c25',
    gradient: 'linear-gradient(145deg, #9c2f00 0%, #e76f51 50%, #f4a261 100%)',
  },
  {
    id: '6',
    name: 'Sweet Circuit',
    cuisine: 'Dessert · Bakery',
    emoji: '🍰',
    rating: 4.8,
    reviews: 477,
    deliveryTime: '15–25 min',
    fee: '$0.99',
    accent: '#7b2cbf',
    gradient: 'linear-gradient(145deg, #5a189a 0%, #9d4edd 50%, #e0aaff 100%)',
  },
]

const steps = [
  {
    num: '1',
    title: 'Enter your address',
    text: 'Tell us where you are so we can show nearby restaurants ready to deliver.',
  },
  {
    num: '2',
    title: 'Pick your meal',
    text: 'Browse categories, check ratings, and build your order from local favorites.',
  },
  {
    num: '3',
    title: 'Track & enjoy',
    text: 'Follow your courier in real time and dig in when it arrives at your door.',
  },
]

function App() {
  const [address, setAddress] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null)

  const selectedRestaurant = restaurants.find(
    (r) => r.id === selectedRestaurantId,
  )

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    if (!address.trim()) return
    // Demo CTA — no backend yet
  }

  function openRestaurant(id: string) {
    setSelectedRestaurantId(id)
    window.scrollTo(0, 0)
  }

  function handleCardKeyDown(e: KeyboardEvent, id: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openRestaurant(id)
    }
  }

  function goHome() {
    setSelectedRestaurantId(null)
    window.scrollTo(0, 0)
  }

  return (
    <div className="page">
      <header className="nav">
        <a
          className="logo"
          href="#top"
          aria-label="Bagel home"
          onClick={(e) => {
            e.preventDefault()
            goHome()
          }}
        >
          <span className="logo-mark" aria-hidden="true" />
          Bagel
        </a>
        {!selectedRestaurant ? (
          <nav className="nav-links" aria-label="Primary">
            <a href="#categories">Browse</a>
            <a href="#restaurants">Restaurants</a>
            <a href="#how">How it works</a>
          </nav>
        ) : (
          <nav className="nav-links" aria-label="Primary">
            <button type="button" className="nav-text-btn" onClick={goHome}>
              ← All restaurants
            </button>
          </nav>
        )}
        <div className="nav-actions">
          <a className="btn btn-ghost" href="#signin">
            Sign in
          </a>
          <a className="btn btn-light" href="#signup">
            Sign up
          </a>
        </div>
      </header>

      {selectedRestaurant ? (
        <main id="top">
          <MenuPage restaurant={selectedRestaurant} onBack={goHome} />
        </main>
      ) : (
        <main id="top">
          <section className="hero">
            <div className="hero-inner">
              <p className="hero-eyebrow">Food delivery, simplified</p>
              <h1>
                Order from the
                <br />
                places you love
              </h1>
              <p className="hero-sub">
                Discover nearby restaurants, track every delivery, and get dinner
                at your door — fast.
              </p>

              <form className="search" onSubmit={handleSearch}>
                <label className="sr-only" htmlFor="address">
                  Delivery address
                </label>
                <span className="search-icon" aria-hidden="true">
                  📍
                </span>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="street-address"
                />
                <button type="submit" className="btn btn-accent">
                  Find food
                </button>
              </form>

              <p className="hero-hint">
                Or{' '}
                <a href="#restaurants">browse featured restaurants</a> near you
              </p>
            </div>
            <div className="hero-glow" aria-hidden="true" />
          </section>

          <section id="categories" className="section categories">
            <div className="section-head">
              <h2>What are you craving?</h2>
              <p>Tap a category to filter the vibe</p>
            </div>
            <div className="category-row" role="list">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="listitem"
                  className={`category-card${activeCategory === cat.id ? ' is-active' : ''}`}
                  onClick={() =>
                    setActiveCategory((prev) =>
                      prev === cat.id ? null : cat.id,
                    )
                  }
                >
                  <span className="category-emoji" aria-hidden="true">
                    {cat.emoji}
                  </span>
                  <span className="category-name">{cat.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section id="restaurants" className="section restaurants">
            <div className="section-head">
              <h2>Featured near you</h2>
              <p>Popular spots with strong ratings and quick delivery</p>
            </div>
            <div className="restaurant-grid">
              {restaurants.map((r) => (
                <article
                  key={r.id}
                  className="restaurant-card"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open menu for ${r.name}`}
                  onClick={() => openRestaurant(r.id)}
                  onKeyDown={(e) => handleCardKeyDown(e, r.id)}
                >
                  <div
                    className="restaurant-thumb"
                    style={{ background: r.gradient }}
                    aria-hidden="true"
                  >
                    <span className="restaurant-thumb-art">{r.emoji}</span>
                    <span className="restaurant-thumb-plate" />
                    {r.promo ? (
                      <span className="restaurant-promo">{r.promo}</span>
                    ) : null}
                  </div>
                  <div className="restaurant-body">
                    <div className="restaurant-title-row">
                      <h3>{r.name}</h3>
                      <span
                        className="rating-pill"
                        title={`${r.rating} out of 5`}
                      >
                        <span className="rating-star" aria-hidden="true">
                          ★
                        </span>
                        {r.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="restaurant-cuisine">
                      <span className="cuisine-tag">{r.cuisine}</span>
                    </p>
                    <div className="restaurant-meta">
                      <span className="meta-item">
                        <span className="meta-icon" aria-hidden="true">
                          ⏱
                        </span>
                        {r.deliveryTime}
                      </span>
                      <span className="meta-sep" aria-hidden="true">
                        ·
                      </span>
                      <span className="meta-item">
                        <span className="meta-icon" aria-hidden="true">
                          🚴
                        </span>
                        {r.fee} delivery
                      </span>
                      <span className="meta-sep" aria-hidden="true">
                        ·
                      </span>
                      <span className="meta-item muted">
                        ({r.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="how" className="section how">
            <div className="section-head">
              <h2>How Bagel works</h2>
              <p>Three steps from hungry to happy</p>
            </div>
            <ol className="steps">
              {steps.map((step) => (
                <li key={step.num} className="step">
                  <span className="step-num" aria-hidden="true">
                    {step.num}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="cta-band">
            <div className="cta-band-inner">
              <h2>Ready when you are</h2>
              <p>Enter your address and start ordering in under a minute.</p>
              <a className="btn btn-accent" href="#top">
                Get started
              </a>
            </div>
          </section>
        </main>
      )}

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a
              className="logo"
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                goHome()
              }}
            >
              <span className="logo-mark" aria-hidden="true" />
              Bagel
            </a>
            <p>Local food delivery, built for everyday cravings.</p>
          </div>
          <div className="footer-cols">
            <div>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#press">Press</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Get help</h4>
              <ul>
                <li>
                  <a href="#support">Support</a>
                </li>
                <li>
                  <a href="#partners">Partner with us</a>
                </li>
                <li>
                  <a href="#couriers">Deliver with Bagel</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="#terms">Terms</a>
                </li>
                <li>
                  <a href="#privacy">Privacy</a>
                </li>
                <li>
                  <a href="#cookies">Cookies</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Bagel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
