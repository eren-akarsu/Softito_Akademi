import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../features/users/userSlice';
import { 
  addTaskThunk, 
  updateTaskThunk, 
  deleteTaskThunk, 
  completeTaskThunk, 
  changeTaskStatusThunk 
} from '../features/tasks/taskSlice';
import { addNotificationThunk } from '../features/notifications/notificationSlice';

const TaskCard = ({ 
  task, 
  userRole, 
  viewMode
}) => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [localStatus, setLocalStatus] = useState(task.status);
  const [localFeedback, setLocalFeedback] = useState(task.feedback || '');
  
  // Rejection state
  const [showRejectionInput, setShowRejectionInput] = useState(false);
  const [rejectionReasonText, setRejectionReasonText] = useState('');

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editCategory, setEditCategory] = useState(task.category || 'mülki');

  // Delegation state
  const [showDelegateForm, setShowDelegateForm] = useState(false);
  const [delegationText, setDelegationText] = useState('');
  
  // Filter developers in same group
  const groupDevelopers = users.filter(u => u.role === 'developer' && u.groupId === currentUser?.groupId);
  const [delegateToId, setDelegateToId] = useState('');

  useEffect(() => {
    if (groupDevelopers.length > 0) {
      setDelegateToId(groupDevelopers[0].id);
    }
  }, [currentUser, users]);

  // Local confirm delete state to avoid using window.confirm
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Keep local state in sync when task changes (e.g. from props update)
  useEffect(() => {
    setLocalStatus(task.status);
    setLocalFeedback(task.feedback || '');
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate);
    setEditPriority(task.priority);
    setEditCategory(task.category || 'mülki');
    setShowRejectionInput(false);
    setRejectionReasonText('');
  }, [task]);

  const assignedByUser = users.find(u => u.id === task.assignedBy);
  const assignedToUser = users.find(u => u.id === task.assignedTo);

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'yuksek': return 'Yüksek';
      case 'orta': return 'Orta';
      case 'dusuk': return 'Düşük';
      default: return priority;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'bekliyor': return 'Bekliyor';
      case 'devam_ediyor': return 'Devam Ediyor';
      case 'tamamlandi': return 'Tamamlandı (Onay Bekliyor)';
      case 'tamamlanmadi': return 'Tamamlanmadı (Onay Bekliyor)';
      case 'onaylandi': return 'Onaylandı';
      case 'reddedildi': return 'Reddedildi';
      case 'iptal_edildi': return 'İptal Edildi';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    return status;
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'askeri': return 'Yazılım / Geliştirme 💻';
      case 'imari': return 'Altyapı / DevOps ⚙️';
      case 'mali': return 'Finans / Bütçe 💰';
      case 'mülki': return 'Yönetim / İdari 📁';
      default: return 'Genel 📁';
    }
  };

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!localFeedback.trim()) {
      dispatch(addNotificationThunk({ message: "Lütfen tamamlanan iş hakkında geri bildirim yazınız!", type: "error" }));
      return;
    }
    if (localStatus === 'bekliyor') {
      dispatch(addNotificationThunk({ message: "Görev durumunu 'Devam Ediyor', 'Tamamlandı' veya 'Tamamlanmadı' olarak seçmelisiniz!", type: "error" }));
      return;
    }
    
    // Update task status and feedback on Firestore
    dispatch(changeTaskStatusThunk({ id: task.id, status: localStatus, feedback: localFeedback }));
    
    // Notify creator
    dispatch(addNotificationThunk({
      message: `${currentUser.fullName} görev bildiriminde bulundu: "${task.title}". Durum: ${getStatusLabel(localStatus)}`,
      type: 'info',
      assignedTo: task.assignedBy
    }));

    dispatch(addNotificationThunk({ message: 'Geri bildirim başarıyla gönderildi.', type: 'success' }));
  };

  const handleDelegateSubmit = (e) => {
    e.preventDefault();
    if (!delegationText.trim()) {
      dispatch(addNotificationThunk({ message: "Lütfen Geliştiriciye iletilecek görev tanımını yazınız!", type: "error" }));
      return;
    }
    const targetDevId = delegateToId || (groupDevelopers[0]?.id || 'developer1');
    const childTaskId = 'task-dev-' + Date.now();
    
    // Create developer child task on Firestore
    dispatch(addTaskThunk({
      id: childTaskId,
      title: `Geliştirici Süreci: ${task.title}`,
      description: delegationText,
      dueDate: task.dueDate,
      priority: task.priority,
      category: task.category || 'mülki',
      status: 'bekliyor',
      assignedBy: currentUser.id,
      assignedByRole: 'teamLeader',
      assignedTo: targetDevId,
      assignedToRole: 'developer',
      groupId: currentUser.groupId,
      parentTaskId: task.id,
      isArchived: false
    }));

    // Update parent task with child reference and in-progress status
    dispatch(updateTaskThunk({
      id: task.id,
      status: 'devam_ediyor',
      delegatedTaskId: childTaskId
    }));

    // Notify developer
    dispatch(addNotificationThunk({
      message: `Takım Lideri ${currentUser.fullName} size yeni bir görev iletti: "${task.title}"`,
      type: 'info',
      assignedTo: targetDevId
    }));

    dispatch(addNotificationThunk({ message: 'Görev Geliştiriciye Gönderildi.', type: 'success' }));
    setDelegationText('');
    setShowDelegateForm(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editDescription.trim() || !editDueDate) {
      dispatch(addNotificationThunk({ message: "Lütfen tüm alanları doldurunuz!", type: "error" }));
      return;
    }
    dispatch(updateTaskThunk({
      id: task.id,
      title: editTitle,
      description: editDescription,
      dueDate: editDueDate,
      priority: editPriority,
      category: editCategory
    }));
    dispatch(addNotificationThunk({ message: 'Görev detayları güncellendi.', type: 'success' }));
    setIsEditing(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTaskThunk(task.id));
    
    // Notify assignee
    dispatch(addNotificationThunk({
      message: `Bir görev iptal edildi: "${task.title}"`,
      type: 'warning',
      assignedTo: task.assignedTo
    }));

    dispatch(addNotificationThunk({ message: 'Görev başarıyla iptal edildi.', type: 'success' }));
    setShowConfirmDelete(false);
  };

  // Determine if assignee can edit/update task state
  const isEditable = viewMode === 'assigned_to_me' && task.status !== 'onaylandi' && !task.isArchived;

  // Determine if creator can review/approve/reject task
  const isReviewable = viewMode === 'created_by_me' && (task.status === 'tamamlandi' || task.status === 'tamamlanmadi') && !task.isArchived;

  // Can the creator edit or delete the task? (Only if pending or rejected)
  const isManageable = viewMode === 'created_by_me' && (task.status === 'bekliyor' || task.status === 'reddedildi') && !task.isArchived;

  return (
    <div className={`task-card ${task.status === 'onaylandi' ? 'task-card-approved' : ''}`}>
      {/* Visual Stamps for Modern Tech Dashboard */}
      {task.status === 'onaylandi' && (
        <div className="modern-status-stamp stamp-onaylandi">
          <span>ONAYLANDI</span>
        </div>
      )}
      {task.status === 'reddedildi' && (
        <div className="modern-status-stamp stamp-reddedildi">
          <span>REDDEDİLDİ</span>
        </div>
      )}
      {task.status === 'iptal_edildi' && (
        <div className="modern-status-stamp stamp-reddedildi" style={{ borderColor: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--text-muted)' }}>İPTAL EDİLDİ</span>
        </div>
      )}

      {isEditing ? (
        /* Edit Mode Form */
        <form onSubmit={handleSaveEdit} className="task-card-edit-form">
          <div className="form-group">
            <label>Görev Başlığı</label>
            <input 
              type="text" 
              className="form-control" 
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Görev Tanımı</label>
            <textarea 
              className="form-control" 
              rows="3"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Teslim Tarihi</label>
            <input 
              type="date" 
              className="form-control" 
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Kategori</label>
            <select 
              className="form-control" 
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              <option value="mülki">Yönetim / İdari 📁</option>
              <option value="askeri">Yazılım / Geliştirme 💻</option>
              <option value="imari">Altyapı / DevOps ⚙️</option>
              <option value="mali">Finans / Bütçe 💰</option>
            </select>
          </div>
          <div className="form-group">
            <label>Öncelik</label>
            <select 
              className="form-control" 
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="dusuk">Düşük</option>
              <option value="orta">Orta</option>
              <option value="yuksek">Yüksek</option>
            </select>
          </div>
          <div className="btn-action-group">
            <button type="submit" className="btn-primary">💾 Kaydet</button>
            <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>Vazgeç</button>
          </div>
        </form>
      ) : (
        /* Regular Display Mode */
        <>
          <div className="task-card-header">
            <h4 className="task-card-title">{task.title}</h4>
            <div className="task-badges">
              <span className="badge badge-category">
                {getCategoryLabel(task.category || 'mülki')}
              </span>
              <span className={`badge badge-priority-${task.priority}`}>
                {getPriorityLabel(task.priority)}
              </span>
              <span className={`badge badge-status badge-status-${getStatusClass(task.status)}`}>
                {getStatusLabel(task.status)}
              </span>
            </div>
          </div>

          <div className="task-card-body">
            <p className="task-desc">{task.description}</p>
          </div>

          {/* Show existing feedback if present */}
          {task.feedback && (
            <div className="task-feedback-section">
              <span className="feedback-title">Geri Bildirim:</span>
              <p className="feedback-text">“{task.feedback}”</p>
            </div>
          )}

          {/* Show rejection reason if present */}
          {task.rejectionReason && (
            <div className="task-feedback-section" style={{ borderLeftColor: 'var(--priority-yuksek)', backgroundColor: '#fff5f5' }}>
              <span className="feedback-title" style={{ color: 'var(--priority-yuksek)' }}>Reddedilme Nedeni:</span>
              <p className="feedback-text" style={{ color: '#b91c1c' }}>“{task.rejectionReason}”</p>
            </div>
          )}

          {/* Developer status update inside Team Leader task card */}
          {task.delegatedTaskId && (
            <div className="delegation-info-badge">
              <span className="delegation-info-title">💻 Geliştirici Süreç Durumu:</span>
              <span className={`badge badge-status badge-status-${getStatusClass(task.delegatedTaskStatus)}`}>
                {getStatusLabel(task.delegatedTaskStatus)}
              </span>
              {task.delegatedTaskFeedback && (
                <p className="delegation-feedback-text">
                  <strong>Geliştirici Geri Bildirimi:</strong> “{task.delegatedTaskFeedback}”
                </p>
              )}
              {task.delegatedTaskRejectionReason && (
                <p className="delegation-feedback-text" style={{ color: '#b91c1c' }}>
                  <strong>Ret Nedeni:</strong> “{task.delegatedTaskRejectionReason}”
                </p>
              )}
            </div>
          )}

          <div className="task-card-meta">
            <span className="task-creator">
              {viewMode === 'assigned_to_me' ? 'Gönderen: ' : 'Sorumlu: '}
              <strong>
                {viewMode === 'assigned_to_me' 
                  ? (assignedByUser ? `${assignedByUser.icon} ${assignedByUser.fullName}` : task.assignedByRole)
                  : (assignedToUser ? `${assignedToUser.icon} ${assignedToUser.fullName}` : task.assignedToRole)
                }
              </strong>
            </span>
            <span className="task-date">
              ⏳ Teslim: <strong>{task.dueDate}</strong>
            </span>
          </div>

          {/* Manage controls (Edit / Delete) */}
          {isManageable && (
            <div className="task-card-manage-row">
              {showConfirmDelete ? (
                <div className="confirm-delete-box">
                  <span>Bu görevi iptal etmek istediğinize emin misiniz?</span>
                  <div className="btn-action-group">
                    <button 
                      type="button" 
                      className="btn-danger btn-sm"
                      onClick={handleConfirmDelete}
                    >
                      Evet, İptal Et
                    </button>
                    <button 
                      type="button" 
                      className="btn-secondary btn-sm"
                      onClick={() => setShowConfirmDelete(false)}
                    >
                      Vazgeç
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button 
                    type="button" 
                    className="btn-manage btn-manage-edit"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Düzenle
                  </button>
                  <button 
                    type="button" 
                    className="btn-manage btn-manage-delete"
                    onClick={() => setShowConfirmDelete(true)}
                  >
                    🗑️ Görevi İptal Et
                  </button>
                </>
              )}
            </div>
          )}

          {/* Assignee Edit Interface (Status selection & feedback form) */}
          {isEditable && (
            <div className="task-actions">
              <div className="status-button-group">
                <button
                  type="button"
                  className={`btn-status-toggle ${localStatus === 'devam_ediyor' ? 'active' : ''}`}
                  data-status="devam_ediyor"
                  onClick={() => setLocalStatus('devam_ediyor')}
                >
                  Devam Ediyor
                </button>
                <button
                  type="button"
                  className={`btn-status-toggle ${localStatus === 'tamamlandi' ? 'active' : ''}`}
                  data-status="tamamlandi"
                  onClick={() => setLocalStatus('tamamlandi')}
                >
                  Tamamlandı
                </button>
                <button
                  type="button"
                  className={`btn-status-toggle ${localStatus === 'tamamlanmadi' ? 'active' : ''}`}
                  data-status="tamamlanmadi"
                  onClick={() => setLocalStatus('tamamlanmadi')}
                >
                  Tamamlanmadı
                </button>
              </div>

              <div className="feedback-input-group">
                <label htmlFor={`feedback-${task.id}`}>Geri Bildirim Metni</label>
                <textarea
                  id={`feedback-${task.id}`}
                  className="feedback-textarea"
                  placeholder="Görevle ilgili durumu, notlarınızı veya çıktıları buraya yazınız..."
                  value={localFeedback}
                  onChange={(e) => setLocalFeedback(e.target.value)}
                  required
                />
              </div>

              <button 
                type="button" 
                className="btn-primary"
                onClick={handleSendFeedback}
              >
                🤝 Geri Bildirim Gönder
              </button>

              {/* Team Leader Delegation Option */}
              {userRole === 'teamLeader' && !task.delegatedTaskId && (
                <div className="delegation-box">
                  {!showDelegateForm ? (
                    <button 
                      type="button" 
                      className="btn-manage btn-manage-delegate"
                      style={{ width: '100%', marginTop: '8px' }}
                      onClick={() => setShowDelegateForm(true)}
                    >
                      💻 Geliştiriciye Gönder (Görevlendir)
                    </button>
                  ) : (
                    <form onSubmit={handleDelegateSubmit} className="delegate-subform">
                      {groupDevelopers.length > 0 && (
                        <div className="feedback-input-group">
                          <label>Görevlendirilecek Geliştirici</label>
                          <select
                            className="form-control"
                            value={delegateToId}
                            onChange={(e) => setDelegateToId(e.target.value)}
                            required
                            style={{ marginBottom: '12px' }}
                          >
                            {groupDevelopers.map(dev => (
                              <option key={dev.id} value={dev.id}>
                                {dev.icon} {dev.fullName}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div className="feedback-input-group">
                        <label>Geliştirici Görev Emri</label>
                        <textarea
                          className="feedback-textarea"
                          placeholder="Geliştiriciye aktarılacak detaylı görev tanımını giriniz..."
                          value={delegationText}
                          onChange={(e) => setDelegationText(e.target.value)}
                          required
                        />
                      </div>
                      <div className="btn-action-group">
                        <button type="submit" className="btn-primary">🚀 Gönder</button>
                        <button type="button" className="btn-secondary" onClick={() => setShowDelegateForm(false)}>İptal</button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Creator Review Interface (Approve / Reject) */}
          {isReviewable && (
            <div className="task-actions">
              <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--navy-dark)', fontStyle: 'italic' }}>
                Görevli çalışmasını tamamladığını beyan etti. Bu görevi onaylıyor musunuz?
              </p>
              
              {!showRejectionInput ? (
                <div className="btn-action-group">
                  <button
                    type="button"
                    className="btn-success"
                    onClick={() => {
                      dispatch(completeTaskThunk(task.id));
                      
                      // Notify assignee
                      dispatch(addNotificationThunk({
                        message: `Tebrikler! "${task.title}" başlıklı göreviniz onaylandı.`,
                        type: 'success',
                        assignedTo: task.assignedTo
                      }));

                      dispatch(addNotificationThunk({ message: 'Görev başarıyla onaylandı.', type: 'success' }));
                    }}
                  >
                    ✔️ Onayla
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => setShowRejectionInput(true)}
                  >
                    ❌ Reddet
                  </button>
                </div>
              ) : (
                <div className="rejection-form" style={{ marginTop: '10px', width: '100%' }}>
                  <div className="feedback-input-group">
                    <label style={{ color: 'var(--priority-yuksek)', fontWeight: 'bold' }}>Ret Sebebi (Zorunlu)</label>
                    <textarea
                      className="feedback-textarea"
                      placeholder="Görevin reddedilme sebebini yazınız..."
                      value={rejectionReasonText}
                      onChange={(e) => setRejectionReasonText(e.target.value)}
                      required
                    />
                  </div>
                  <div className="btn-action-group" style={{ marginTop: '8px' }}>
                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() => {
                        if (!rejectionReasonText.trim()) {
                          dispatch(addNotificationThunk({ message: "Lütfen ret sebebini yazınız!", type: "error" }));
                          return;
                        }
                        dispatch(changeTaskStatusThunk({ id: task.id, status: 'reddedildi', rejectionReason: rejectionReasonText }));
                        
                        // Notify assignee
                        dispatch(addNotificationThunk({
                          message: `Görev reddedildi: "${task.title}". Sebep: ${rejectionReasonText}`,
                          type: 'error',
                          assignedTo: task.assignedTo
                        }));

                        dispatch(addNotificationThunk({ message: 'Görev onaylanmadı ve reddedildi.', type: 'error' }));
                        setShowRejectionInput(false);
                        setRejectionReasonText('');
                      }}
                    >
                      ❌ Reddetmeyi Tamamla
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setShowRejectionInput(false);
                        setRejectionReasonText('');
                      }}
                    >
                      İptal
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskCard;
