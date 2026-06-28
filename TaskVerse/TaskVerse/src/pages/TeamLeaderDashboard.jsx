
import { useDispatch, useSelector } from 'react-redux';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { selectDevelopersByTeamLeaderGroup } from '../features/users/userSlice';
import { addTaskThunk, selectTasksByCurrentUser } from '../features/tasks/taskSlice';
import { addNotificationThunk } from '../features/notifications/notificationSlice';

const TeamLeaderDashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const groupDevelopers = useSelector((state) => 
    selectDevelopersByTeamLeaderGroup(state, currentUser?.id)
  );
  
  const activeTasks = useSelector(selectTasksByCurrentUser);

  // 1. Tasks assigned to Team Leader by Manager (active, not approved, not archived)
  const incomingTasks = activeTasks.filter(t => 
    t.assignedTo === currentUser?.id && 
    t.assignedByRole === 'manager'
  );

  // 2. Tasks sent by Team Leader to Developer (active, not approved, not archived)
  const outgoingTasks = activeTasks.filter(t => 
    t.assignedBy === currentUser?.id && 
    t.assignedToRole === 'developer'
  );

  const handleCreateDeveloperTask = async (taskData) => {
    const targetDevId = taskData.assignedTo || (groupDevelopers[0]?.id || 'DEV0101');
    const resultAction = await dispatch(addTaskThunk({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: 'bekliyor',
      assignedBy: currentUser.id,
      assignedTo: targetDevId,
      assignedByRole: 'teamLeader',
      assignedToRole: 'developer',
      feedback: '',
      dueDate: taskData.dueDate,
      category: taskData.category,
      groupId: currentUser.groupId
    }));

    if (addTaskThunk.fulfilled.match(resultAction)) {
      dispatch(addNotificationThunk({ 
        message: 'Görev başarıyla gönderildi.', 
        type: 'success',
        assignedTo: currentUser.id
      }));
    } else {
      const errorMsg = resultAction.payload || 'Görev gönderilemedi.';
      dispatch(addNotificationThunk({ 
        message: `Hata: ${errorMsg}`, 
        type: 'error',
        assignedTo: currentUser.id
      }));
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-title-section">
        <h2 className="serif-font">Takım Lideri Paneli</h2>
        <p className="dashboard-subtitle">
          Yöneticiden gelen görevleri tamamlayın ve geliştirici ekibin görevlerini koordine edin.
        </p>
      </div>

      <div className="dashboard-grid-equal">
        {/* Column 1: Yöneticiden Gelen Görevler */}
        <div className="panel-card">
          <h3 className="panel-title">
            <span className="panel-title-icon">👔</span> Yöneticiden Gelen Görevler
          </h3>

          {incomingTasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state-icon">✔️</span>
              <p>Aktif atanan görev bulunmamaktadır.</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                Yöneticiden gelecek yeni işleri bekleyebilirsiniz.
              </p>
            </div>
          ) : (
            <div className="tasks-container">
              {incomingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  userRole="teamLeader"
                  viewMode="assigned_to_me"
                />
              ))}
            </div>
          )}
        </div>

        {/* Column 2: Geliştirici Görev Yönetimi */}
        <div className="panel-card-flow">
          {/* Create Developer Task Form */}
          <div className="panel-card-sub" style={{ marginBottom: '20px' }}>
            <h3 className="panel-title">
              <span className="panel-title-icon">🚀</span> Geliştiriciye Görev Gönder
            </h3>
            <TaskForm onSubmit={handleCreateDeveloperTask} buttonText="Geliştiriciye Gönder" assignees={groupDevelopers} />
          </div>

          {/* List of Sent Tasks */}
          <div className="panel-card-sub">
            <h3 className="panel-title">
              <span className="panel-title-icon">💻</span> Geliştiriciye Gönderilen Aktif Görevler
            </h3>

            {outgoingTasks.length === 0 ? (
              <div className="empty-state">
                <span className="empty-state-icon">📋</span>
                <p>Henüz süreçte aktif bir görev bulunmamaktadır.</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                  Yukarıdaki form ile geliştiriciye ilk görevini atayabilirsiniz.
                </p>
              </div>
            ) : (
              <div className="tasks-container">
                {outgoingTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    userRole="teamLeader"
                    viewMode="created_by_me"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TeamLeaderDashboard;
