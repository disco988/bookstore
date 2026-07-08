import { useState } from "react";

const STRIPE_LINK = "https://buy.stripe.com/test_8x23cufqB6Mk4NU2w22wU00";

const BOOK = {
  title: "The Last Landmark",
  author: "Marta Zawadzka",
  price: 18,
  currency: "$",
  tagline:
    "A novel about getting lost in your own city - and the maps we draw for ourselves.",
  blurb:
    "When cartographer Ida loses the sight in one eye, the world she spent her whole life measuring and ordering begins to blur. Instead of fighting the chaos, she learns to read it anew. A quiet, precise story about how you regain your bearings in life not by returning to the old map, but by drawing a different one.",
  meta: ["Novel", "328 pages", "First edition", "2026"],
};

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  function handleBuy(e) {
    e.preventDefault();


 
    const cleanEmail = email.trim();
    
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setStatus({
        type: "error",
        text: "Enter a valid email address to complete your purchase.",
      });
      return;
    }

    window.fpr("referral", { email: cleanEmail });

    window.location.href = STRIPE_LINK;
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span className="font-display text-xl font-600 tracking-tight text-petrol">
            Northgate&nbsp;Books
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto grid max-w-5xl gap-12 px-6 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        {/* Left column — the book */}
        <section className="rise">
          <div className="flex flex-col items-start gap-8 sm:flex-row">
            {/* CSS-rendered cover */}
            <div className="book-cover relative flex h-64 w-44 shrink-0 flex-col justify-between p-5 text-paper">
              <span className="pl-3 text-[0.6rem] uppercase tracking-[0.25em] text-paper/70">
                Northgate Books
              </span>
              <span className="pl-3 font-display text-2xl font-600 leading-tight">
                {BOOK.title}
              </span>
              <span className="pl-3 font-display text-sm italic text-paper/85">
                {BOOK.author}
              </span>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-petrol">
                New release
              </p>
              <h1 className="mt-2 font-display text-4xl font-600 leading-[1.05] tracking-tight">
                {BOOK.title}
              </h1>
              <p className="mt-2 font-display text-lg italic text-muted">
                {BOOK.author}
              </p>
              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink/80">
                {BOOK.tagline}
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-xs text-muted">
                {BOOK.meta.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-ink/15 px-3 py-1"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 max-w-lg text-[0.95rem] leading-relaxed text-ink/75">
            {BOOK.blurb}
          </p>
        </section>

        {/* Right column — checkout */}
        <section className="rise md:pt-2">
          <form
            onSubmit={handleBuy}
            className="rounded-2xl border border-ink/10 bg-paperdeep/60 p-7 shadow-[0_20px_50px_-30px_rgba(28,27,25,0.5)]"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted">Price</span>
              <span className="font-display text-3xl font-600 text-petrol">
                {BOOK.currency}
                {BOOK.price}
              </span>
            </div>

            <hr className="my-6 border-ink/10" />

            <label className="block text-sm font-500 text-ink">
              Full name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className="mt-1.5 w-full rounded-lg border border-ink/15 bg-paper px-3.5 py-2.5 text-sm outline-none transition focus:border-petrol focus:ring-2 focus:ring-petrol/20"
              />
            </label>

            <label className="mt-4 block text-sm font-500 text-ink">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
                className="mt-1.5 w-full rounded-lg border border-ink/15 bg-paper px-3.5 py-2.5 text-sm outline-none transition focus:border-petrol focus:ring-2 focus:ring-petrol/20"
              />
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-petrol px-4 py-3 text-sm font-600 text-paper transition hover:bg-petroldark  focus-visible:outline-offset-2 focus-visible:outline-petrol disabled:opacity-60"
            >
              Buy
            </button>

            {status && (
              <p
                role="status"
                className={
                  "mt-4 rounded-lg px-3.5 py-2.5 text-sm " +
                  (status.type === "error"
                    ? "bg-red-50 text-red-800"
                    : "bg-petrol/10 text-petroldark")
                }
              >
                {status.text}
              </p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}
