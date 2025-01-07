"use client";

export default function ClearButton() {
  const removePosts = async () => {
    try {
      const res = await fetch("/api/clear", { method: "DELETE" });
      const message = await res.json();
      alert(message);
    } catch (error) {
      console.error("Error clearing posts:", error);
      alert("Failed to clear posts.");
    }
  };

  return (
    <button
      onClick={removePosts}
      style={{
        padding: "10px 20px",
        marginTop: "20px",
        backgroundColor: "#ff5c5c",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Clear Posts
    </button>
  );
}
