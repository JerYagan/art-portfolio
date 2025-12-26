export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-2 py-8 flex flex-wrap gap-4 justify-between md:flex-row md:items-center md:justify-between text-xs text-white/70">

        {/* Left */}
        <div className="flex flex-col gap-1">
          <span>
            Fan-made character page inspired by Genshin Impact.
          </span>
          <span>
            Genshin Impact © HoYoverse
          </span>
        </div>

        {/* Right */}
        <div className="flex flex-col md:items-end gap-1">
          <span>
            Character Art & Design by{" "}
            <span className="text-white font-medium">
              Pupao
            </span>
          </span>
          <span className="opacity-50 mb-16 md:mb-0 lg:mb-0">
            Non-commercial • Personal project
          </span>
        </div>

      </div>
    </footer>
  );
}
