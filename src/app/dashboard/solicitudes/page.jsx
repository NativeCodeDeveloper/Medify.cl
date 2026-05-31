export default function Solicitudes() {
  return (
    <div className="p-8">
      <div className="mb-7">
        <p className="font-semibold text-[#6e6e73] uppercase mb-1" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
          Próximamente
        </p>
        <h1 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
          Solicitudes de ingreso
        </h1>
      </div>
      <div className="bg-white rounded-2xl border border-[#e5e5ea] p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#f5f5f7] flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        </div>
        <p className="font-semibold text-[#1d1d1f] mb-2" style={{ fontSize: "17px" }}>
          Disponible cuando el backend esté conectado
        </p>
        <p className="font-light text-[#6e6e73] max-w-sm mx-auto" style={{ fontSize: "14px" }}>
          Aquí aparecerán las solicitudes enviadas desde el formulario <code>/unirse</code>. Se conectará al backend Java con la tabla <code>join_requests</code>.
        </p>
      </div>
    </div>
  );
}
