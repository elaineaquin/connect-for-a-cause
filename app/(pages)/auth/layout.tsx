export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex justify-center flex-col items-center min-h-screen bg-zinc-50 dark:bg-zinc-900 space-y-2">
      <h1 className="text-2xl md:text-4xl font-bold">Connect For A Cause</h1>
      {children}
    </main>
  );
}
