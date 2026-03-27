export default function ConceptBadge() {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-20 z-50 flex items-center gap-2 rounded-full bg-slate-900/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white shadow-lg">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Concept Preview
    </div>
  );
}
