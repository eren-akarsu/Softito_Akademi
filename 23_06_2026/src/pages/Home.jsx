import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/courses.json')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div className="space-y-xl">
      <section className="mt-lg">
        <h2 className="text-headline-lg">Merhaba, Ahmet! 👋</h2>
        <p className="text-body-md">Bugün ne öğrenmek istersin?</p>
      </section>

      <section>
        <div className="search-bar-wrapper">
          <span className="material-symbols-outlined search-bar-icon">search</span>
          <input 
            type="text" 
            placeholder="Kurs, eğitmen veya konu ara..." 
            className="search-bar-input" 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate('/courses?q=' + encodeURIComponent(e.target.value));
              }
            }}
          />
        </div>
      </section>

      <section className="category-chips-scroll no-scrollbar">
        <button onClick={() => navigate('/courses')} className="category-chip-active">Tümü</button>
        <button onClick={() => navigate('/courses?cat=Tasarım')} className="category-chip">Tasarım</button>
        <button onClick={() => navigate('/courses?cat=Yazılım')} className="category-chip">Yazılım</button>
        <button onClick={() => navigate('/courses?cat=Pazarlama')} className="category-chip">Pazarlama</button>
        <button onClick={() => navigate('/courses?cat=İşletme')} className="category-chip">İşletme</button>
      </section>

      <section>
        <div className="hero-card block">
          <div className="hero-overlay"></div>
          <div 
            className="hero-bg-img"
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMhSTJBrMvCxohdOiO08I77jgTYR1qxRzpZfQ1h7CRQHKJ1E3ALBNF_zgFiEYB1Q0PND57ZzMOccOY-zHdzm85MEiNqUtWVEEx6DiFW0Nmasld9IXDr3_Wy_c3gIOm7QI4LaUi49ViVQyOVeX2cx13MjxR0uRl95wccrcrEZgGay5oEhHuoHzn4ZBMQ08T0olw9bOrPHsOam9e74LcIWNoEbgFZVQ1GUFzBLT6q35Cj0XDTABX_IJS9S4B_dPSbBpA8uQ9ubwkKckB')` }}
          ></div>
          <div className="hero-text-container">
            <span className="badge-tag">ÖNE ÇIKAN</span>
            <h3 className="text-display-lg mt-2">UI/UX Tasarım Temelleri 2024</h3>
            <p className="hero-description">Profesyonel tasarımcı olmak için gereken her şey bu kursta.</p>
            <button onClick={() => navigate('/course/ui-design')} className="btn-primary mt-4">Şimdi Başla</button>
          </div>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2 className="text-headline-md">Popüler Kurslar</h2>
          <Link to="/courses" className="section-link">Tümünü Gör</Link>
        </div>
        <div className="courses-scroll-container no-scrollbar">
          {courses.map(course => (
            <div key={course.id} className="course-card" onClick={() => navigate('/course/' + course.id)}>
              <div className="course-card-img-wrapper">
                <img src={course.image} alt={course.title} className="course-card-img" />
                {course.price > 1000 && <span className="badge-bestseller-absolute">ÇOK SATAN</span>}
              </div>
              <div className="course-card-info">
                <div className="course-card-title">{course.title}</div>
                <p className="course-card-author">{course.instructor.name}</p>
                <div className="course-card-rating-row">
                  <span className="text-label-md text-secondary">{course.rating}</span>
                  <div className="course-card-rating-stars">
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star_half</span>
                  </div>
                  <span className="text-caption text-outline">({course.ratingCount})</span>
                </div>
                <div className="course-card-footer">
                  <span className="text-headline-md text-primary">₺{course.price}</span>
                  <span className="material-symbols-outlined course-card-fav-btn">favorite</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-md">
        <h2 className="text-headline-md mb-md">Kategorilere Göz At</h2>
        <div className="grid-cols-2-4">
          <div className="category-grid-item" onClick={() => navigate('/courses?cat=Tasarım')}>
            <div className="category-grid-icon-circle">
              <span className="material-symbols-outlined">palette</span>
            </div>
            <span className="text-label-lg">Tasarım</span>
          </div>
          <div className="category-grid-item" onClick={() => navigate('/courses?cat=Yazılım')}>
            <div className="category-grid-icon-circle">
              <span className="material-symbols-outlined">code</span>
            </div>
            <span className="text-label-lg">Yazılım</span>
          </div>
          <div className="category-grid-item" onClick={() => navigate('/courses?cat=Pazarlama')}>
            <div className="category-grid-icon-circle">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <span className="text-label-lg">Pazarlama</span>
          </div>
          <div className="category-grid-item" onClick={() => navigate('/courses?cat=İşletme')}>
            <div className="category-grid-icon-circle">
              <span className="material-symbols-outlined">business_center</span>
            </div>
            <span className="text-label-lg">İşletme</span>
          </div>
        </div>
      </section>

      <section>
        <div className="ongoing-card" onClick={() => navigate('/watch/react-nextjs')}>
          <div className="flex-1">
            <span className="ongoing-subtitle">ÖĞRENMEYE DEVAM ET</span>
            <h4 className="text-title-lg mt-1">React ve Next.js Temelleri</h4>
            <div className="ongoing-progress-track">
              <div className="bg-secondary-container h-full" style={{ width: '65%' }}></div>
            </div>
            <p className="ongoing-progress-text">%65 tamamlandı</p>
          </div>
          <div className="ongoing-play-btn">
            <span className="material-symbols-outlined">play_arrow</span>
          </div>
        </div>
      </section>
    </div>
  );
}
