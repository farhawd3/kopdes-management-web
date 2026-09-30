'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="card">
      <h1>Halaman belum dapat dibuka</h1>
      <p role="alert">Terjadi gangguan. Data belum ditampilkan.</p>
      <button onClick={reset}>Coba lagi</button>
    </section>
  );
}
