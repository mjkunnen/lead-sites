export default function GradientMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="gradient-mesh-blob absolute -left-20 top-1/4 h-96 w-96 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, #DBEAFE, transparent 70%)" }}
      />
      <div
        className="gradient-mesh-blob absolute -right-20 top-1/2 h-80 w-80 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #E0E7FF, transparent 70%)" }}
      />
      <div
        className="gradient-mesh-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full opacity-35"
        style={{ background: "radial-gradient(circle, #CFFAFE, transparent 70%)" }}
      />
    </div>
  );
}
