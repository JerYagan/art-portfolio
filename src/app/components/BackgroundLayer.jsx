export default function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/anemo-bg-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
