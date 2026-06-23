import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/courses.json')
      .then(res => res.json())
      .then(data => {
        const enrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
        const filtered = data.filter(c => enrolled.includes(c.id));
        setEnrolledCourses(filtered);
      });
  }, []);

  const getProgress = (courseId) => {
    if (courseId === 'react-nextjs') return 65;
    if (courseId === 'data-science') return 20;
    return 100; 
  };

  const getLessonsCount = (courseId) => {
    if (courseId === 'react-nextjs') return { watched: 2, total: 4 };
    if (courseId === 'data-science') return { watched: 1, total: 2 };
    return { watched: 2, total: 2 };
  };

  const displayedCourses = enrolledCourses.filter(course => {
    const progress = getProgress(course.id);
    if (activeTab === 'active') return progress < 100;
    if (activeTab === 'completed') return progress === 100;
    return true;
  });

  return (
    <div className="space-y-lg">
      <div className="pt-lg">
        <h2 className="text-display-lg text-primary">Eğitimlerim</h2>
      </div>

      <section className="category-chips-scroll no-scrollbar">
        <button 
          onClick={() => setActiveTab('all')} 
          className={activeTab === 'all' ? 'category-chip-active' : 'category-chip'}
        >
          Tümü
        </button>
        <button 
          onClick={() => setActiveTab('active')} 
          className={activeTab === 'active' ? 'category-chip-active' : 'category-chip'}
        >
          Devam Edenler
        </button>
        <button 
          onClick={() => setActiveTab('completed')} 
          className={activeTab === 'completed' ? 'category-chip-active' : 'category-chip'}
        >
          Tamamlananlar
        </button>
      </section>

      {enrolledCourses.length === 0 ? (
        <div className="py-lg text-center">
          <p className="text-body-lg mycourses-empty-text">Henüz kayıtlı eğitimin yok.</p>
          <button onClick={() => navigate('/courses')} className="btn-primary mx-auto">
            Kurslara Göz At
          </button>
        </div>
      ) : (
        <section className="grid-cols-1-2-3">
          {displayedCourses.map(course => {
            const progress = getProgress(course.id);
            const count = getLessonsCount(course.id);
            const isCompleted = progress === 100;
            return (
              <div 
                key={course.id} 
                className="course-card" 
                onClick={() => navigate(isCompleted ? '/course/' + course.id : '/watch/' + course.id)}
              >
                <div className={isCompleted ? 'mycourses-card-img-wrapper-completed' : 'mycourses-card-img-wrapper'}>
                  <img src={course.image} alt={course.title} className="course-card-img" />
                  {isCompleted && (
                    <div className="mycourses-completed-overlay">
                      <div className="mycourses-completed-icon-circle">
                        <span className="material-symbols-outlined mycourses-completed-icon">check_circle</span>
                      </div>
                    </div>
                  )}
                  <div className="mycourses-card-badge">
                    <span className="mycourses-card-badge-text">{course.category}</span>
                  </div>
                </div>
                <div className="mycourses-card-body">
                  <div className="course-card-title">{course.title}</div>
                  <p className="text-caption text-on-surface-variant">{course.instructor.name}</p>
                  <div className="mt-4">
                    <div className="mycourses-progress-header">
                      <span className="text-label-md text-secondary">
                        {isCompleted ? 'Tamamlandı' : `%${progress} tamamlandı`}
                      </span>
                      <span className="text-label-md text-on-surface-variant">
                        {count.watched}/{count.total} Ders
                      </span>
                    </div>
                    <div className={isCompleted ? 'mycourses-progress-track-completed' : 'mycourses-progress-track'}>
                      <div className="h-full bg-secondary" style={{ width: `${progress}%` }}></div>
                    </div>
                    {isCompleted && (
                      <button className="mycourses-btn-certificate" onClick={(e) => {
                        e.stopPropagation();
                        alert('Sertifikanız başarıyla indirildi!');
                      }}>
                        Sertifikayı Görüntüle
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
