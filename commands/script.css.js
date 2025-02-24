/*CMD
  command: script.css
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
        :root {
            --safe-area-top: env(safe-area-inset-top, 20px);
            --safe-area-bottom: env(safe-area-inset-bottom, 20px);
            --safe-area-left: env(safe-area-inset-left, 20px);
            --safe-area-right: env(safe-area-inset-right, 20px);
            
            --primary-accent: #6366f1;
            --danger-accent: #ef4444;
            --success-accent: #22c55e;
            --glass-bg: rgba(255, 255, 255, 0.05);
            --text-primary: #f8fafc;
        }
        body { 
            margin: 0; 
            overflow: hidden; 
            font-family: 'Inter', sans-serif; 
            background: linear-gradient(45deg, #0f172a, #1e293b);
            color: var(--text-primary);
        }
        canvas { display: block; }
        
        .game-ui {
            position: fixed;
            top: var(--safe-area-top);
            left: var(--safe-area-left);
            right: var(--safe-area-right);
            padding: 12px;
            display: flex;
            justify-content: space-between;
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            border-radius: 16px;
            margin: 8px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 100;
        }
        .ui-card {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 8px;
        }
        .ui-icon {
            width: 20px;
            height: 20px;
            filter: brightness(1.5);
        }
        
        .game-screen {
            position: fixed;
            top: var(--safe-area-top);
            left: var(--safe-area-left);
            right: var(--safe-area-right);
            bottom: var(--safe-area-bottom);
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(16px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px;
            z-index: 1000;
        }
        .screen-heading {
            font-size: 2.5rem;
            font-weight: 700;
            background: linear-gradient(45deg, var(--primary-accent), #8b5cf6);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 1.5rem;
        }
        
        .game-button {
            background: linear-gradient(45deg, var(--primary-accent), #4f46e5);
            border: none;
            color: white;
            padding: 14px 28px;
            font-size: 1.1rem;
            font-weight: 500;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            width: min(80vw, 280px);
            margin: 8px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .game-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(99, 102, 241, 0.2);
        }
        .button-danger {
            background: linear-gradient(45deg, var(--danger-accent), #dc2626);
        }
        .button-success {
            background: linear-gradient(45deg, var(--success-accent), #16a34a);
        }
        
        .user-profile {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background: var(--glass-bg);
            backdrop-filter: blur(8px);
            border-radius: 16px;
            margin-bottom: 2rem;
            width: min(90%, 300px);
            position: relative;
        }

        .profile-top {
            position: relative;
            display: flex;
            align-items: center;
        }

        .user-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 2px solid var(--primary-accent);
            object-fit: cover;
        }

        .emoji-status-btn {
            position: absolute;
            right: -10px;
            bottom: -5px;
            background: var(--primary-accent);
            border: 2px solid #1e293b;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .emoji-status-btn:hover {
            transform: scale(1.1);
            background: #4f46e5;
        }

        .emoji-status-btn img {
            width: 20px;
            height: 20px;
        }

        .user-name {
            font-size: 1.2rem;
            font-weight: 600;
            margin-top: 12px;
            max-width: 250px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
        }
        .floating {
            animation: float 3s ease-in-out infinite;
        }
        
        .game-effect {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 500;
        }
        .freeze-effect {
            background: linear-gradient(
                rgba(178, 235, 242, 0.1),
                rgba(178, 235, 242, 0.2)
            );
            animation: iceShimmer 2s infinite;
            overflow: hidden;
        }
        .bomb-effect {
            background: rgba(239, 68, 68, 0.2);
            animation: bombShake 0.4s;
        }

        .ice-crack {
            position: absolute;
            width: 40px;
            height: 40px;
            background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 22H22L12 2M12 12L14 14M12 12L16 8M12 12L8 16" stroke="%2300ffff" stroke-width="1"/></svg>');
            opacity: 0.3;
        }

        .freeze-particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            animation: fall linear;
        }

        @keyframes iceShimmer {
            0% { opacity: 0.3; }
            50% { opacity: 0.6; }
            100% { opacity: 0.3; }
        }

        @keyframes bombShake { 
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-5px, 5px); }
            50% { transform: translate(5px, -5px); }
            75% { transform: translate(-5px, -5px); }
        }

        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }

        .fullscreen-indicator {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--glass-bg);
            padding: 12px 20px;
            border-radius: 12px;
            font-size: 0.95rem;
            backdrop-filter: blur(12px);
            display: flex;
            gap: 10px;
            align-items: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .fullscreen-indicator.visible {
            opacity: 1;
            visibility: visible;
        }
