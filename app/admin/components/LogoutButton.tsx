"use client";

export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        window.location.href = '/admin/login';
      }}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-semibold"
    >
      Logout
    </button>
  );
}
