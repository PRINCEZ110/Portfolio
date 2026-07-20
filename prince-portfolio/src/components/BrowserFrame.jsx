function MacControls() {
  return (
    <div className="flex items-center gap-[6px] flex-shrink-0">
      <div className="relative w-3 h-3 rounded-full bg-[#fe5f57] shadow-inner shadow-[rgba(0,0,0,0.15)]">
        <div className="absolute inset-[3px] rounded-full opacity-0 hover:opacity-100 transition-opacity bg-[rgba(0,0,0,0.2)]" />
      </div>
      <div className="relative w-3 h-3 rounded-full bg-[#febc2e] shadow-inner shadow-[rgba(0,0,0,0.15)]">
        <div className="absolute inset-[3px] rounded-full opacity-0 hover:opacity-100 transition-opacity bg-[rgba(0,0,0,0.2)]" />
      </div>
      <div className="relative w-3 h-3 rounded-full bg-[#28c840] shadow-inner shadow-[rgba(0,0,0,0.15)]">
        <div className="absolute inset-[3px] rounded-full opacity-0 hover:opacity-100 transition-opacity bg-[rgba(0,0,0,0.2)]" />
      </div>
    </div>
  );
}

function WinControls() {
  return (
    <div className="flex items-center flex-shrink-0">
      <div className="w-[46px] h-[30px] flex items-center justify-center group cursor-default">
        <div className="w-[10px] h-[10px] border-[1.5px] border-white/20 group-hover:border-white/40 transition-colors" />
      </div>
      <div className="w-[46px] h-[30px] flex items-center justify-center group cursor-default">
        <div className="w-[10px] h-[2px] bg-white/20 group-hover:bg-white/40 transition-colors" />
      </div>
      <div className="w-[46px] h-[30px] flex items-center justify-center group cursor-default hover:bg-red-500/80 transition-colors">
        <svg className="w-[10px] h-[10px] text-white/40 group-hover:text-white" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="1" y1="1" x2="9" y2="9" />
          <line x1="9" y1="1" x2="1" y2="9" />
        </svg>
      </div>
    </div>
  );
}

function NavBtn({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-1 rounded text-white/30 hover:text-white/60 hover:bg-white/5 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default function BrowserFrame({ children, url, variant = 'mac', showNav, onBack, onForward, onRefresh, canGoBack, canGoForward }) {
  const isMac = variant === 'mac';

  return (
    <div className="relative">
      {/* Outer desk shadow */}
      <div
        className="absolute -bottom-4 left-[3%] right-[3%] h-8 blur-2xl"
        style={{ background: 'rgba(179,156,79,0.08)' }}
      />
      <div
        className="absolute -bottom-2 left-[8%] right-[8%] h-4 blur-lg"
        style={{ background: 'rgba(179,156,79,0.05)' }}
      />

      {/* Window */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: isMac ? '10px' : '8px',
          background: '#0d0d0d',
          boxShadow: isMac
            ? '0 0 0 0.5px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.65), 0 10px 30px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.3)'
            : '0 0 0 0.5px rgba(255,255,255,0.05), 0 30px 80px rgba(0,0,0,0.55), 0 10px 30px rgba(0,0,0,0.35)',
        }}
      >
        {/* Inner border highlight */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            borderRadius: isMac ? '10px' : '8px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        />

        {/* ─── MAC VERSION ─── */}
        {isMac ? (
          <>
            {/* Title bar */}
            <div
              className="flex items-center h-[38px] px-[14px] gap-2"
              style={{
                background: 'linear-gradient(180deg, #2c2c2e 0%, #262628 100%)',
                borderBottom: '1px solid rgba(0,0,0,0.4)',
              }}
            >
              <div className="flex items-center gap-0.5">
                <MacControls />
                {showNav && (
                  <div className="flex items-center ml-3 gap-0.5">
                    <NavBtn onClick={onBack} disabled={!canGoBack}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </NavBtn>
                    <NavBtn onClick={onForward} disabled={!canGoForward}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </NavBtn>
                    <NavBtn onClick={onRefresh}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                    </NavBtn>
                  </div>
                )}
              </div>

              {/* URL bar - Safari style */}
              <div
                className="flex items-center gap-2 mx-auto h-[22px] rounded-[6px] px-3"
                style={{
                  background: 'rgba(0,0,0,0.35)',
                  minWidth: showNav ? '35%' : '45%',
                  maxWidth: showNav ? '45%' : '55%',
                }}
              >
                <svg className="w-[10px] h-[10px] text-white/20 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[7.5px] font-mono text-white/35 truncate tracking-tight flex-1 text-center">{url}</span>
              </div>

              {/* Spacer to balance */}
              <div className="w-[52px] flex-shrink-0" />
            </div>
          </>
        ) : (
          <>
            {/* ─── WINDOWS VERSION ─── */}
            {/* Title bar */}
            <div
              className="flex items-center h-[30px] px-0"
              style={{
                background: 'linear-gradient(180deg, #323232 0%, #2a2a2a 100%)',
                borderBottom: '1px solid rgba(0,0,0,0.4)',
              }}
            >
              {/* App title */}
              <div className="flex items-center gap-1.5 px-3 flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-blue-400/60" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="text-[10px] font-['Segoe UI','Arial',sans-serif] text-white/40 tracking-tight">Browser</span>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Window controls */}
              <WinControls />
            </div>

            {/* Tab strip */}
            <div
              className="flex items-center h-[34px] px-3 gap-0"
              style={{
                background: '#1f1f1f',
                borderBottom: '1px solid rgba(0,0,0,0.3)',
              }}
            >
              {/* Active tab */}
              <div
                className="flex items-center gap-2 h-[28px] px-3 rounded-t-[5px]"
                style={{
                  background: '#0d0d0d',
                  border: '1px solid rgba(0,0,0,0.3)',
                  borderBottom: '1px solid #0d0d0d',
                  marginBottom: '-1px',
                }}
              >
                <svg className="w-3 h-3 text-blue-400/40" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="text-[10px] font-['Segoe UI','Arial',sans-serif] text-white/50 truncate max-w-[80px]">{url}</span>
                <svg className="w-2.5 h-2.5 text-white/15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              {/* New tab */}
              <div className="w-[30px] h-[28px] flex items-center justify-center cursor-default group">
                <svg className="w-3 h-3 text-white/15 group-hover:text-white/30 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            </div>

            {/* URL bar */}
            <div
              className="flex items-center h-[36px] px-3 gap-1"
              style={{
                background: '#1a1a1a',
                borderBottom: '1px solid rgba(0,0,0,0.3)',
              }}
            >
              {showNav && (
                <div className="flex items-center gap-0.5 mr-1">
                  <NavBtn onClick={onBack} disabled={!canGoBack}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                  </NavBtn>
                  <NavBtn onClick={onForward} disabled={!canGoForward}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </NavBtn>
                  <NavBtn onClick={onRefresh}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                  </NavBtn>
                </div>
              )}
              <svg className="w-3 h-3 text-white/15 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9z" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <div className="flex-1 flex items-center h-[24px] rounded-[4px] px-2.5 gap-1.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <svg className="w-[9px] h-[9px] text-white/15 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[8px] font-mono text-white/30 truncate tracking-tight flex-1">{url}</span>
              </div>
              <svg className="w-3 h-3 text-white/15 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              <svg className="w-3 h-3 text-white/15 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </>
        )}

        {/* Browser content */}
        <div className="relative">
          {children}

          {/* Screen reflection overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.025) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.008) 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
