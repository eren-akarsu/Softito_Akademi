import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, buttonText = "Görev Oluştur", assignees = [] }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('dusuk'); // dusuk, orta, yuksek
  const [category, setCategory] = useState('mülki'); // askeri, imari, mali, mülki
  const [assignedToId, setAssignedToId] = useState('');

  useEffect(() => {
    if (assignees.length > 0) {
      setAssignedToId(assignees[0].id);
    } else {
      setAssignedToId('');
    }
  }, [assignees]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) {
      return;
    }

    onSubmit({
      title,
      description,
      dueDate,
      priority,
      category,
      assignedTo: assignedToId || (assignees[0]?.id || '')
    });

    // Reset fields after submit
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('dusuk');
    setCategory('mülki');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {assignees.length > 0 && (
        <div className="form-group">
          <label htmlFor="task-assignee">Atanacak Personel</label>
          <select
            id="task-assignee"
            className="form-control"
            value={assignedToId}
            onChange={(e) => setAssignedToId(e.target.value)}
            required
          >
            {assignees.map(user => (
              <option key={user.id} value={user.id}>
                {user.icon} {user.fullName} ({user.title})
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="task-title">Görev Başlığı</label>
        <input
          id="task-title"
          type="text"
          className="form-control"
          placeholder="Örn: E-ticaret Entegrasyonu Geliştirilmesi..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-desc">Görev Açıklaması</label>
        <textarea
          id="task-desc"
          className="form-control"
          placeholder="Görevin detaylarını, adımlarını ve beklentilerini giriniz..."
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-date">Son Teslim Tarihi (Deadline)</label>
        <input
          id="task-date"
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-category">Görev Kategorisi</label>
        <select
          id="task-category"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="mülki">Yönetim / İdari 📁</option>
          <option value="askeri">Yazılım / Geliştirme 💻</option>
          <option value="imari">Altyapı / DevOps ⚙️</option>
          <option value="mali">Finans / Bütçe 💰</option>
        </select>
      </div>

      <div className="form-group">
        <label>Öncelik Derecesi</label>
        <div className="priority-selector">
          <button
            type="button"
            className={`priority-option ${priority === 'dusuk' ? 'active' : ''}`}
            data-priority="dusuk"
            onClick={() => setPriority('dusuk')}
          >
            Düşük
          </button>
          <button
            type="button"
            className={`priority-option ${priority === 'orta' ? 'active' : ''}`}
            data-priority="orta"
            onClick={() => setPriority('orta')}
          >
            Orta
          </button>
          <button
            type="button"
            className={`priority-option ${priority === 'yuksek' ? 'active' : ''}`}
            data-priority="yuksek"
            onClick={() => setPriority('yuksek')}
          >
            Yüksek
          </button>
        </div>
      </div>

      <button type="submit" className="btn-primary form-btn-submit">
        🚀 {buttonText}
      </button>
    </form>
  );
};

export default TaskForm;
