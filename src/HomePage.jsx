import React, { useState } from 'react';
import CharacterCustomize from './CharacterCustomize';
import MonsterCustomize from './MonsterCustomize';
import XpConditionCustomize from './XpConditionCustomize';
import RewardCustomize from './RewardCustomize';
import GameSimulation from './GameSimulation';

function HomePage() {
  const [activeTab, setActiveTab] = useState('character');
  const [address] = useState("0x1234...abcd"); // 실제로는 지갑 연결에서 가져옴

  const tabs = [
    { id: 'character', name: '캐릭터 설정', icon: '👤' },
    { id: 'monster', name: '몬스터 설정', icon: '👹' },
    { id: 'xp', name: 'XP 조건', icon: '⚡' },
    { id: 'reward', name: '보상 설정', icon: '🎁' },
    { id: 'simulation', name: '게임 시뮬레이션', icon: '🎮' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'character':
        return <CharacterCustomize address={address} />;
      case 'monster':
        return <MonsterCustomize address={address} />;
      case 'xp':
        return <XpConditionCustomize address={address} />;
      case 'reward':
        return <RewardCustomize address={address} />;
      case 'simulation':
        return <GameSimulation address={address} />;
      default:
        return <CharacterCustomize address={address} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* 헤더 */}
      <div style={{ 
        background: '#fff', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ 
            textAlign: 'center', 
            margin: 0, 
            color: '#1e293b',
            fontSize: '28px',
            fontWeight: 'bold'
          }}>
            🎮 TxRPG - 트랜잭션 기반 자동 성장 RPG
          </h1>
          <p style={{ 
            textAlign: 'center', 
            margin: '8px 0 0 0', 
            color: '#64748b',
            fontSize: '14px'
          }}>
            Monad 블록체인 기반 SaaS 플랫폼
          </p>
        </div>
      </div>

      {/* 네비게이터 */}
      <div style={{ 
        background: '#fff', 
        borderBottom: '1px solid #e2e8f0',
        padding: '0 20px'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            gap: 0,
            overflowX: 'auto',
            padding: '0 10px'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 24px',
                  background: activeTab === tab.id ? '#6366f1' : 'transparent',
                  color: activeTab === tab.id ? '#fff' : '#64748b',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid #4f46e5' : '3px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  minWidth: '120px'
                }}
              >
                <span style={{ marginRight: '8px', fontSize: '16px' }}>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: '40px 20px',
        minHeight: 'calc(100vh - 200px)'
      }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default HomePage; 