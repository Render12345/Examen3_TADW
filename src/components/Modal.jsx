import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Modal = forwardRef(({ materia }, ref) => {
  const dialogRef = useRef(null);

  // Estado para el input del nuevo mensaje
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  const mensajes = [
    {
      id: 1,
      sender_type: "Alumno",
      texto: "Hola",
      hora: "09:00 AM",
      posicion: "chat-end",
      color: "chat-bubble-primary",
    },
    {
      id: 2,
      sender_type: "Maestro",
      texto: "Hola, ¿qué necesitas?",
      hora: "10:00 AM",
      posicion: "chat-start",
      color: "",
    },
    {
      id: 3,
      sender_type: "Alumno",
      texto:
        "Tenia duda de las calificaciones del segundo parcial, ¿ya las subió?",
      hora: "11:30 AM",
      posicion: "chat-end",
      color: "chat-bubble-primary",
    },
  ];

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current.showModal(),
    close: () => dialogRef.current.close(),
  }));

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;

    // TODO: Lógica para enviar el mensaje (ej. llamar a una API o actualizar el estado de mensajes)
    console.log("Mensaje a enviar:", nuevoMensaje);

    // Limpiamos el input después de "enviar"
    setNuevoMensaje("");
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box flex flex-col h-[70vh] max-h-[500px] p-0 overflow-hidden">
        {/* Header fijo con botón de cerrar integrado */}
        <div className="p-4 bg-base-200 border-b border-base-300 flex justify-between items-center z-10">
          <h3 className="font-bold text-lg">Chat: {materia}</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-error">✕</button>
          </form>
        </div>

        {/* Cuerpo SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100">
          {mensajes.map((msg) => (
            <div key={msg.id} className={`chat ${msg.posicion}`}>
              <div className="chat-header opacity-70 mb-1">
                {msg.sender_type}
                <time className="text-xs ml-2">{msg.hora}</time>
              </div>
              <div className={`chat-bubble ${msg.color}`}>{msg.texto}</div>
            </div>
          ))}
        </div>

        {/* Footer fijo con Input de texto */}
        <div className="p-3 border-t border-base-300 bg-base-200">
          <form onSubmit={handleEnviar} className="flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="input input-bordered input-sm flex-1"
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Cerrar al hacer clic fuera del modal */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
});

export default Modal;
