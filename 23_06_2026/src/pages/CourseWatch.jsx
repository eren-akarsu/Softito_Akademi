import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CourseWatch() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('lessons');

  useEffect(() => {
    fetch('/courses.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id === id);
        setCourse(found);
        if (found && found.curriculum.length > 0 && found.curriculum[0].lessons.length > 0) {
          setActiveLesson(found.curriculum[0].lessons[0]);
        }
      });
  }, [id]);

  if (!course || !activeLesson) {
    return <div className="py-xl text-center">Yükleniyor...</div>;
  }

  return (
    <div className="pb-32">
      <section className="watch-video-section">
        <video 
          key={activeLesson.id}
          className="video-player-tag" 
          src={activeLesson.videoUrl} 
          controls 
          autoPlay
        />
      </section>

      <section className="py-md">
        <div className="watch-info-header">
          <p className="watch-module-title">{course.title}</p>
          <h2 className="text-headline-md text-on-surface">{activeLesson.title}</h2>
          <div className="flex-wrap-gap mt-1">
            <div className="flex-gap-sm">
              <span className="material-symbols-outlined watch-star-icon">star</span>
              <span className="text-label-md">{course.rating}</span>
            </div>
            <span className="text-on-surface-variant text-caption">•</span>
            <span className="text-caption text-on-surface-variant">{course.students} Öğrenci</span>
          </div>
        </div>

        <div className="watch-tabs no-scrollbar">
          <button 
            onClick={() => setActiveTab('lessons')} 
            className={activeTab === 'lessons' ? 'watch-tab-btn-active' : 'watch-tab-btn'}
          >
            Ders Listesi
          </button>
          <button 
            onClick={() => setActiveTab('notes')} 
            className={activeTab === 'notes' ? 'watch-tab-btn-active' : 'watch-tab-btn'}
          >
            Notlar
          </button>
          <button 
            onClick={() => setActiveTab('resources')} 
            className={activeTab === 'resources' ? 'watch-tab-btn-active' : 'watch-tab-btn'}
          >
            Kaynaklar
          </button>
        </div>

        {activeTab === 'lessons' && (
          <div className="mt-md space-y-sm">
            {course.curriculum.flatMap(section => section.lessons).map(lesson => {
              const isActive = lesson.id === activeLesson.id;
              return (
                <div 
                  key={lesson.id} 
                  className={isActive ? 'playlist-lesson-item-active' : 'playlist-lesson-item'}
                  onClick={() => setActiveLesson(lesson)}
                >
                  <div className={isActive ? 'watch-lesson-icon-watching' : 'watch-lesson-icon-completed'}>
                    <span className="material-symbols-outlined">
                      {isActive ? 'play_arrow' : 'check_circle'}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-body-md font-semibold">{lesson.title}</p>
                    <p className="text-caption text-on-surface-variant">{lesson.duration} • {isActive ? 'İzleniyor' : 'Tamamlandı'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="text-body-md watch-tab-content-empty">
            Bu ders hakkında henüz not eklenmemiş.
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="text-body-md watch-tab-content-empty">
            Bu dersin kaynak dosyası bulunmuyor.
          </div>
        )}
      </section>

      <div className="watch-footer">
        <button className="watch-footer-btn-nav">
          <span className="material-symbols-outlined">skip_previous</span>
          <span className="text-label-md">Önceki</span>
        </button>
        <button className="watch-footer-play-btn">
          <span className="material-symbols-outlined">pause</span>
        </button>
        <button className="watch-footer-btn-nav">
          <span className="material-symbols-outlined">skip_next</span>
          <span className="text-label-md">Sonraki</span>
        </button>
        <div className="watch-footer-btn-nav">
          <span className="material-symbols-outlined">playlist_add_check</span>
          <span className="text-label-md">Bitir</span>
        </div>
      </div>
    </div>
  );
}
