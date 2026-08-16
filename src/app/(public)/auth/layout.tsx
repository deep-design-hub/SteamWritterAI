export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col px-4 py-12">
      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </div>
  );
}
