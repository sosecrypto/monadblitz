import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';
import { monadGasConfig, envConfig } from './privy-config';

export function MonadWalletConnect() {
  const { 
    login, 
    logout, 
    authenticated, 
    user, 
    ready,
    sendTransaction,
    switchChain 
  } = usePrivy();
  
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await login();
    } catch (error) {
      console.error('로그인 실패:', error);
      setError('지갑 연결에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setTxHash('');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      setError('연결 해제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestTransaction = async () => {
    if (!user?.wallet) {
      setError('지갑이 연결되지 않았습니다.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Monad Testnet USDT 컨트랙트로 테스트 트랜잭션
      const tx = await sendTransaction({
        to: '0x88b8E2161DEDC77EF4ab7585569D2415a1C1055D', // USDT 컨트랙트
        value: '0.0001', // 0.0001 MON
        gasLimit: monadGasConfig.gasLimit,
        sponsored: true, // 가스비 스폰서링
      });
      
      setTxHash(tx.hash);
      console.log('트랜잭션 성공:', tx);
    } catch (error) {
      console.error('트랜잭션 실패:', error);
      setError('트랜잭션 전송에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToMonad = async () => {
    try {
      await switchChain(10143); // Monad Testnet ChainID
    } catch (error) {
      console.error('체인 전환 실패:', error);
      setError('Monad Testnet으로 전환에 실패했습니다.');
    }
  };

  if (!ready) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        fontSize: '16px'
      }}>
        초기화 중...
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ 
        color: '#333', 
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        🚀 Monad Testnet 지갑 연결
      </h2>
      
      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c33',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          border: '1px solid #fcc'
        }}>
          {error}
        </div>
      )}
      
      {!authenticated ? (
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handleLogin}
            disabled={loading}
            style={{ 
              padding: '15px 30px', 
              fontSize: '16px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? '연결 중...' : '🔗 지갑 연결'}
          </button>
          
          <div style={{ 
            marginTop: '20px',
            fontSize: '14px',
            color: '#666'
          }}>
            <p>• 이메일 또는 기존 지갑으로 연결</p>
            <p>• Monad Testnet에서 테스트 가능</p>
            <p>• 가스비 스폰서링 지원</p>
          </div>
        </div>
      ) : (
        <div>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>✅ 연결된 지갑</h3>
            <p><strong>주소:</strong> {user?.wallet?.address}</p>
            <p><strong>체인:</strong> Monad Testnet (Chain ID: 10143)</p>
            <p><strong>네트워크:</strong> {user?.wallet?.chainId === 10143 ? '✅ Monad Testnet' : '❌ 다른 네트워크'}</p>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            {user?.wallet?.chainId !== 10143 && (
              <button 
                onClick={handleSwitchToMonad}
                style={{ 
                  padding: '10px 20px', 
                  fontSize: '14px',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  cursor: 'pointer'
                }}
              >
                🔄 Monad Testnet으로 전환
              </button>
            )}
            
            <button 
              onClick={handleSendTestTransaction}
              disabled={loading || user?.wallet?.chainId !== 10143}
              style={{ 
                padding: '12px 24px', 
                fontSize: '14px',
                backgroundColor: '#51cf66',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginRight: '10px',
                cursor: (loading || user?.wallet?.chainId !== 10143) ? 'not-allowed' : 'pointer',
                opacity: (loading || user?.wallet?.chainId !== 10143) ? 0.7 : 1
              }}
            >
              {loading ? '전송 중...' : '💸 테스트 트랜잭션'}
            </button>
            
            <button 
              onClick={handleLogout}
              style={{ 
                padding: '12px 24px', 
                fontSize: '14px',
                backgroundColor: '#868e96',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              🔌 연결 해제
            </button>
          </div>
          
          {txHash && (
            <div style={{
              backgroundColor: '#d4edda',
              padding: '15px',
              borderRadius: '5px',
              marginTop: '20px',
              border: '1px solid #c3e6cb'
            }}>
              <h4 style={{ marginTop: 0, color: '#155724' }}>✅ 트랜잭션 성공!</h4>
              <p><strong>트랜잭션 해시:</strong></p>
              <a 
                href={`${envConfig.MONAD_EXPLORER}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                  wordBreak: 'break-all'
                }}
              >
                {txHash}
              </a>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                🔗 위 링크를 클릭하여 Monad Explorer에서 확인하세요
              </p>
            </div>
          )}
          
          <div style={{
            marginTop: '30px',
            padding: '15px',
            backgroundColor: '#e7f3ff',
            borderRadius: '5px',
            fontSize: '14px'
          }}>
            <h4 style={{ marginTop: 0, color: '#004085' }}>ℹ️ Monad Testnet 정보</h4>
            <p><strong>RPC URL:</strong> {envConfig.MONAD_RPC_URL}</p>
            <p><strong>체인 ID:</strong> {envConfig.MONAD_CHAIN_ID}</p>
            <p><strong>탐색기:</strong> <a href={envConfig.MONAD_EXPLORER} target="_blank" rel="noopener noreferrer">{envConfig.MONAD_EXPLORER}</a></p>
            <p><strong>Faucet:</strong> <a href={envConfig.MONAD_FAUCET} target="_blank" rel="noopener noreferrer">{envConfig.MONAD_FAUCET}</a></p>
          </div>
        </div>
      )}
    </div>
  );
} 