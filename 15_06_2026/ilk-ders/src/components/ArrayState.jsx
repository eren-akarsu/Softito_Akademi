import { useState } from 'react';

const ArrayState = () => {
  const [gorevler, setGorevler] = useState([
    { id: 1, baslik: "useState çalışma mantığını öğren", tamamlandi: true },
    { id: 2, baslik: "Dizi state'i güncelleme alıştırması yap", tamamlandi: false },
    { id: 3, baslik: "Form event handling yapılarını incele", tamamlandi: false }
  ]);
  const [yeniGorev, setYeniGorev] = useState("");

  const gorevEkle = (e) => {
    e.preventDefault();
    if (yeniGorev.trim() === "") return;

    const yeni = {
      id: Date.now(),
      baslik: yeniGorev,
      tamamlandi: false
    };

    setGorevler([...gorevler, yeni]);
    setYeniGorev("");
  };

  const gorevSil = (id) => {

    setGorevler(gorevler.filter(g => g.id !== id));
  };

  const gorevTamamlaToggle = (id) => {

    setGorevler(
      gorevler.map(g => g.id === id ? { ...g, tamamlandi: !g.tamamlandi } : g)
    );
  };

  const tamamlananlarSayisi = gorevler.filter(g => g.tamamlandi).length;

  return (
    <div className="p-4">
      <h3 className="demo-title">Demo 5: Dizi (Array) State Yönetimi</h3>
      

      <div className="demo-card demo-card-xl space-y-4">
        <div className="card-header-list">
          <h4 className="demo-section-title">Yapılacaklar Listesi</h4>
          <span className="demo-count-span">
            {tamamlananlarSayisi} / {gorevler.length} Tamamlandı
          </span>
        </div>

        <form onSubmit={gorevEkle} className="flex gap-2">
          <input
            type="text"
            value={yeniGorev}
            onChange={(e) => setYeniGorev(e.target.value)}
            placeholder="Yeni bir görev ekleyin..."
            className="demo-input"
          />
          <button
            type="submit"
            className="btn-blue-submit"
          >
            Ekle
          </button>
        </form>

        {gorevler.length === 0 ? (
          <p className="empty-list-text">Henüz görev eklenmemiş.</p>
        ) : (
          <div className="todo-list-container">
            {gorevler.map((g) => (
              <div
                key={g.id}
                className={`todo-item ${g.tamamlandi ? "todo-item-completed" : ""}`}
              >
                <div className="todo-item-left">
                  <input
                    type="checkbox"
                    checked={g.tamamlandi}
                    onChange={() => gorevTamamlaToggle(g.id)}
                    className="todo-checkbox"
                  />
                  <span className="todo-item-text">{g.baslik}</span>
                </div>
                <button
                  onClick={() => gorevSil(g.id)}
                  className="btn-delete-todo"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      
    </div>
  );
};

export default ArrayState;