import "./App.css";
import { JitsiMeeting } from "@jitsi/react-sdk";
import Input from "./components/input";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useConfigOptionsStore, useMembersStore } from "./lib/stores";

function App() {
  const { displayName, setDisplayName, roomName, setRoomName } =
    useConfigOptionsStore();
  const [clearMembers, setClearMembers] = useState(false);
  const [openMeeting, setOpenMeeting] = useState(false);
  const { members, setMembers } = useMembersStore();

  function onSubmit(e) {
    e.preventDefault();
    if (!roomName || !displayName) {
      return toast.error("Llena todos los campos.");
    } else {
      if (clearMembers) {
        setMembers([]);
      }
      setOpenMeeting(true);
      return toast.success("Iniciando reunión...");
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen gap-8 bg-gray-100">
      {openMeeting ? (
        <>
          <div className="container flex flex-col h-screen p-8 mx-auto bg-white rounded-lg shadow-lg">
            <JitsiMeeting
              roomName={roomName}
              userInfo={{
                displayName,
              }}
              onApiReady={(JitsiMeetAPI) => {
                JitsiMeetAPI.addListener("participantJoined", (event) => {
                  setMembers([...members, event]);
                });
              }}
              getIFrameRef={(iframeRef) => {
                iframeRef.style.height = "100%";
                iframeRef.style.width = "100%";
              }}
            />
          </div>
          <div className="container flex flex-col h-screen p-8 mx-auto bg-white rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-center">
              Miembros presentes:
            </h1>
            {/* /* TABLA CON N. DE MIEMBRO, NOMBRE Y CARGO (SIEMPRE ES MIEMBRO) */}
            <table className="w-full text-center table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">N. de miembro</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Cargo</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{index}</td>
                    <td className="px-4 py-2">{member.displayName}</td>
                    <td className="px-4 py-2">Miembro</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <form
          className="container flex flex-col p-8 mx-auto bg-white rounded-lg shadow-lg"
          onSubmit={onSubmit}
        >
          <h1 className="text-xl font-bold text-center">Bienvenidx.</h1>
          {/* FORM */}
          <div className="flex flex-wrap w-full gap-4 py-4 md:flex-nowrap">
            <Input
              label="Ingresa el nombre de la sala de Jitsi"
              name="roomName"
              placeholder="CDMX_Migala"
              onChange={(e) => setRoomName(e.target.value)}
              value={roomName}
            />
            <Input
              label="Ingresa tu nombre"
              name="roomName"
              placeholder="Juan Vázquez (Tu apodo, si tienes)"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </div>
          {/* CHECK FOR CLEARING MEMBERS */}
          <div className="flex items-center justify-center w-full gap-2 pb-4">
            <label htmlFor="clearMembers">Limpiar miembros</label>
            <input
              type="checkbox"
              id="clearMembers"
              name="clearMembers"
              onChange={(e) => setClearMembers(e.target.checked)}
              checked={clearMembers}
            />
          </div>
          <div className="mx-auto">
            <button
              className="px-4 py-2 font-medium text-white bg-indigo-500 rounded shadow hover:bg-indigo-600 tranistion-all active:bg-indigo-700"
              type="submit"
            >
              Iniciar reunión
            </button>
          </div>
          {/* END FORM */}
        </form>
      )}
      <Toaster />
    </div>
  );
}

export default App;
