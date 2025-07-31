'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🚨 Something went wrong</h2>
      <p>{error.message}</p>
      <button
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        onClick={() => reset()}
      >
        🔁 Retry
      </button>
    </div>
  );
}