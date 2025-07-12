import React, { useState } from 'react';

function RewardCustomize({ address }) {
  const [input, setInput] = useState({ name: '', amount: '', probability: '' });
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!input.name.trim()) {
      setError('보상명을 입력하세요.');
      return;
    }
    const amount = Number(input.amount);
    if (!amount || amount <= 0) {
      setError('규모는 1 이상 숫자여야 합니다.');
      return;
    }
    const probability = Number(input.probability);
    if (probability < 0 || probability > 100) {
      setError('확률은 0~100 사이여야 합니다.');
      return;
    }
    if (rewards.some(r => r.name.toLowerCase() === input.name.toLowerCase())) {
      setError('이미 등록된 보상명입니다.');
      return;
    }
    setRewards(prev => [...prev, { name: input.name, amount, probability }]);
    setInput({ name: '', amount: '', probability: '' });
    setError('');
  };

  const handleRemove = (idx) => {
    setRewards(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    alert(`보상 설정 저장!\n지갑: ${address || '-'}\n보상 수: ${rewards.length}`);
  };

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>🎁 보상 설정</h2>
      {address && (
        <div style={{ textAlign: 'center', color: '#0a0', fontWeight: 600, marginBottom: 16, fontSize: 14 }}>
          연결된 지갑: {address}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          type="text"
          value={input.name}
          onChange={e => setInput(i => ({ ...i, name: e.target.value }))}
          placeholder="보상명"
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <input
          type="number"
          min={1}
          value={input.amount}
          onChange={e => setInput(i => ({ ...i, amount: e.target.value }))}
          placeholder="규모"
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <input
          type="number"
          min={0}
          max={100}
          step={0.1}
          value={input.probability}
          onChange={e => setInput(i => ({ ...i, probability: e.target.value }))}
          placeholder="확률(%)"
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <button
          onClick={handleAdd}
          style={{ padding: '8px 16px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
        >
          추가
        </button>
      </div>
      {error && <div style={{ color: '#f44', marginBottom: 8, fontSize: 13 }}>{error}</div>}
      <div style={{ marginBottom: 20 }}>
        {rewards.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', fontSize: 15 }}>보상이 없습니다.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ background: '#f6f6fa' }}>
                <th style={{ padding: 6, borderBottom: '1px solid #eee', textAlign: 'left' }}>보상명</th>
                <th style={{ padding: 6, borderBottom: '1px solid #eee' }}>규모</th>
                <th style={{ padding: 6, borderBottom: '1px solid #eee' }}>확률(%)</th>
                <th style={{ padding: 6, borderBottom: '1px solid #eee' }}></th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((r, idx) => (
                <tr key={idx}>
                  <td style={{ padding: 6, color: '#333', fontWeight: 600 }}>{r.name}</td>
                  <td style={{ padding: 6, textAlign: 'center', color: '#6366f1', fontWeight: 600 }}>{r.amount}</td>
                  <td style={{ padding: 6, textAlign: 'center', color: '#f59e0b', fontWeight: 600 }}>{r.probability}%</td>
                  <td style={{ padding: 6, textAlign: 'center' }}>
                    <button
                      onClick={() => handleRemove(idx)}
                      style={{ background: '#f44', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button
        onClick={handleSave}
        style={{ width: '100%', padding: 12, background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
      >
        저장
      </button>
    </div>
  );
}

export default RewardCustomize; 