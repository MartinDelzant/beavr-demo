export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <a
        className="m-10 p-10 border-4 rounded-md hover:bg-gray-100"
        href="/requirements"
      >
        Requirements
      </a>
      <a
        className="m-10 p-10 border-4 rounded-md hover:bg-gray-100"
        href="/documents"
      >
        Documents
      </a>
    </main>
  );
}
