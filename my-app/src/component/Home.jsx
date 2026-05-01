import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom'  // ✅ Fix 1: was missing

function Home() {
  const navigate = useNavigate()  // ✅ Fix 2: was missing
  const [roomId, setRoomId] = useState("");
  const [user, setUser] = useState("")

  const generate = (e) => {
    e.preventDefault()
    const id = uuid();
    setRoomId(id)
    toast.success("Room ID generated")
  }

  const join = () => {
    if (!roomId || !user) {
      toast.error("Both fields required")
      return;
    }
    navigate(`/editor/${roomId}`, { state: { user } })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #2e1065 50%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '20px', background: 'linear-gradient(135deg, #a855f7, #ec4899)', marginBottom: '16px' }}>
            <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 'bold', background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', margin: 0 }}>CODECAST</h1>
          <p style={{ color: '#94a3b8', marginTop: '8px', fontSize: '14px' }}>Real-time collaborative coding</p>
        </div>

        <div style={{ background: 'rgba(30,27,46,0.8)', backdropFilter: 'blur(8px)', borderRadius: '24px', border: '1px solid rgba(71,85,105,0.5)', padding: '24px' }}>

          {/* Room ID */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>ROOM ID</label>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#64748b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type="text"
                name="id"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}  // ✅ Fix 3: removed duplicate onChange
                placeholder="Enter room code"
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px 16px 12px 40px', color: 'white', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Username */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>USERNAME</label>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#64748b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                type="text"
                name="name"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Your display name"
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px 16px 12px 40px', color: 'white', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={join}  // ✅ Fix 4: join was never connected to the button
            style={{ width: '100%', background: 'linear-gradient(135deg, #a855f7, #ec4899)', border: 'none', borderRadius: '12px', padding: '12px 16px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}
          >
            JOIN ROOM
          </button>

          <div style={{ position: 'relative', margin: '24px 0', textAlign: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100%', borderTop: '1px solid #334155' }}></div>
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <span style={{ background: 'rgba(30,27,46,0.8)', padding: '0 12px', color: '#64748b', fontSize: '12px' }}>OR</span>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span onClick={generate} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Room
            </span>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '11px', marginTop: '24px' }}>
          Join existing room or create a new one to start coding together
        </p>
      </div>
    </div>
  );
}

export default Home;