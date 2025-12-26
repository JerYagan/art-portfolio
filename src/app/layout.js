import "./globals.css";
import BackgroundLayer from "./components/BackgroundLayer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative max-w-6xl mx-auto my-8 min-h-screen bg-black text-white">
        
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <BackgroundLayer />
        </div>

        {/* Content */}
        <main className="relative z-10 mx-4">
          {children}
        </main>

      </body>
    </html>
  );
}
