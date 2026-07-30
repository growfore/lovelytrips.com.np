export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-4xl md:text-5xl divider-dash inline-flex items-center justify-center w-full mb-12">
      <span>{children}</span>
    </h2>
  );
}
