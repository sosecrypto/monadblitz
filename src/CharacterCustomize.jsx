import React, { useRef, useState } from 'react';

function CharacterCustomize({ address }) {
  const [images, setImages] = useState([]); // 여러 이미지
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  // 이미지 파일을 DataURL로 변환
  const fileToDataUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  // 여러 파일 처리
  const handleFiles = async (fileList) => {
    const files = Array.from(fileList).slice(0, 10 - images.length); // 최대 10개
    const newImages = await Promise.all(
      files.map(async (file) => ({
        file,
        url: await fileToDataUrl(file),
        name: file.name,
      }))
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    alert(`캐릭터 저장!\n지갑: ${address || '-'}\n이름: ${name}\n설명: ${desc}\n이미지 개수: ${images.length}`);
  };

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>🧙‍♂️ 캐릭터 커스터마이즈</h2>
      {address && (
        <div style={{ textAlign: 'center', color: '#6366f1', fontWeight: 600, marginBottom: 16, fontSize: 14 }}>
          연결된 지갑: {address}
        </div>
      )}
      {/* 이미지 드롭존 */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: dragActive ? '2px solid #6366f1' : '2px dashed #bbb',
          borderRadius: 10,
          padding: 24,
          textAlign: 'center',
          background: dragActive ? '#f0f4ff' : '#fafbfc',
          marginBottom: 24,
          cursor: 'pointer',
          position: 'relative',
          minHeight: 120,
        }}
        onClick={() => inputRef.current.click()}
      >
        {images.length === 0 ? (
          <span style={{ color: '#888' }}>
            <b>이미지 여러 장 드래그&드롭</b> 또는 클릭하여 업로드<br />
            (최대 10장, PNG/JPG/GIF)
          </span>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {images.map((img, idx) => (
              <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                <img src={img.url} alt={img.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} />
                <button
                  onClick={e => { e.stopPropagation(); handleRemoveImage(idx); }}
                  style={{
                    position: 'absolute', top: -8, right: -8, background: '#f44', color: '#fff', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', fontWeight: 700, fontSize: 14, boxShadow: '0 1px 4px #aaa'
                  }}
                  title="삭제"
                >×</button>
              </div>
            ))}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleInputChange}
        />
      </div>
      {/* 이름, 설명 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600 }}>이름</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="캐릭터 이름"
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontWeight: 600 }}>설명</label>
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="캐릭터 설명"
          rows={3}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, resize: 'none' }}
        />
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

export default CharacterCustomize; 