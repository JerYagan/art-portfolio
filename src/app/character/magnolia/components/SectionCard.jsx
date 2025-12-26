export function SectionCard({ title, children }) {
  return (
    <section className="bg-[#0b2626]/80 rounded-xl p-6 md:p-8 text-white mb-6">
      <h2 className="text-lg font-semibold mb-6 tracking-wide">
        {title}
      </h2>
      {children}
    </section>
  );
}
