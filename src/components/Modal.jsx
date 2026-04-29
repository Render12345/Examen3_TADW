// src/components/Modal.jsx
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";

const Modal = forwardRef(({ materiaSeleccionada }, ref) => {
  const dialogRef = useRef(null);
  const scrollRef = useRef(null);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  const {
    mensajes,
    loading,
    error,
    cargarConversacion,
    enviarMensaje,
    setMensajes,
  } = useChat();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current.showModal();
      if (materiaSeleccionada?.maestroId) {
        cargarConversacion(materiaSeleccionada.maestroId);
      }
    },
    close: () => {
      dialogRef.current.close();
      setMensajes([]); // Limpia los mensajes al cerrar
    },
  }));

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;

    const textoAEnviar = nuevoMensaje;
    setNuevoMensaje(""); // Limpiar input rápidamente

    await enviarMensaje(textoAEnviar);

    // Auto-scroll al fondo al enviar mensaje
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box flex flex-col h-[70vh] max-h-[500px] p-0 overflow-hidden">
        <div className="p-4 bg-base-200 border-b border-base-300 flex justify-between items-center z-10">
          <h3 className="font-bold text-lg">
            Chat: {materiaSeleccionada?.nombre}
          </h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-error">✕</button>
          </form>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100"
        >
          {loading && (
            <div className="text-center py-4 text-base-content/60">
              <span className="loading loading-spinner loading-md"></span>
              <p>Cargando mensajes...</p>
            </div>
          )}

          {error && <div className="text-center py-4 text-error">{error}</div>}

          {!loading && mensajes.length === 0 && !error && (
            <div className="text-center py-4 text-base-content/50">
              Aún no hay mensajes. ¡Envía el primero!
            </div>
          )}

          {!loading &&
            mensajes.map((msg) => {
              // Asumiendo que tu backend responde "estudiante"
              const isEstudiante = msg.sender_type === "estudiante";
              return (
                <div
                  key={msg.id}
                  className={`chat ${isEstudiante ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-header opacity-70 mb-1">
                    {msg.sender_type}
                    <time className="text-xs ml-2">{msg.hora}</time>
                  </div>
                  <div
                    className={`chat-bubble ${isEstudiante ? "chat-bubble-primary" : ""}`}
                  >
                    {msg.texto}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="p-3 border-t border-base-300 bg-base-200">
          <form onSubmit={handleEnviar} className="flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="input input-bordered input-sm flex-1"
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={loading || !nuevoMensaje.trim()}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
});

export default Modal;
