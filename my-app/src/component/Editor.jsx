import { useEffect, useRef, useState } from "react";
import Member from "./Member";
import Id from "./Id";
import { initSocket } from "./socket";
import { useLocation, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
//import { ACTIONS } from "../Action";
import { ACTIONS } from "../Action";

const styles = {
  wrapper: { display: "flex", height: "100vh", background: "#1e2128", fontFamily: "monospace", overflow: "hidden" },
  sidebar: { width: "210px", background: "#252830", display: "flex", flexDirection: "column", borderRight: "1px solid #333" },
  logoRow: { display: "flex", alignItems: "center", gap: "8px", padding: "14px 16px", borderBottom: "1px solid #333" },
  logoIcon: { width: "28px", height: "28px", background: "#444", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" },
  logoText: { color: "#e0e0e0", fontSize: "13px", fontWeight: 600, letterSpacing: "1.5px", fontFamily: "sans-serif" },
  membersSection: { padding: "14px 16px", flex: 1 },
  membersLabel: { color: "#888", fontSize: "12px", margin: 0, fontFamily: "sans-serif", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.8px" },
  membersList: { marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" },
  buttonRow: { padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid #333" },
  copyBtn: { background: "#2e9e55", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontFamily: "sans-serif", fontWeight: 500, cursor: "pointer", textAlign: "left" },
  leaveBtn: { background: "#e04444", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontFamily: "sans-serif", fontWeight: 500, cursor: "pointer", textAlign: "left" },
  editor: { flex: 1, background: "#1e2128", overflow: "hidden", width: "100%" },
};

export default function Editor() {
  const location = useLocation();
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const { roomId } = useParams();
  const [clients, setClients] = useState([]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      const handleError = (e) => {
        console.log("socket error", e);
        toast.error("Socket connection failed");
      };

      socketRef.current.on("connect_error", handleError);
      socketRef.current.on("connect_failed", handleError);

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        user: location.state?.user,
      });

      socketRef.current.on(ACTIONS.JOINED, ({ clients, user, socketId }) => {
        if (user !== location.state?.user) {
          toast.success(`${user} joined`);
        }
        setClients(clients);
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          socketId,
          code: codeRef.current,
        });
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => prev.filter((c) => c.socketId !== socketId));
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, []);

  return (
    <div style={styles.wrapper}>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

      <div style={styles.sidebar}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="4" width="5" height="8" rx="1" fill="#aaa" />
              <rect x="9" y="4" width="5" height="8" rx="1" fill="#aaa" />
            </svg>
          </div>
          <span style={styles.logoText}>CODECAST</span>
        </div>

        <div style={styles.membersSection}>
          <div style={styles.membersLabel}>Members ({clients.length})</div>
          <div style={styles.membersList}>
            {clients.map((c) => (
              <Member key={c.socketId} username={c.username} />
            ))}
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.copyBtn}>Copy Room ID</button>
          <button style={styles.leaveBtn}>Leave Room</button>
        </div>
      </div>

      <div style={styles.editor}>
        <Id
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => (codeRef.current = code)}
        />
      </div>
    </div>
  );
}