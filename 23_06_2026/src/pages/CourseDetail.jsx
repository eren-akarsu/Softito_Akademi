import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    fetch('/courses.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id === id);
        setCourse(found);
      });

    const enrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
    setIsEnrolled(enrolled.includes(id));
  }, [id]);

  if (!course) {
    return <div className="py-xl text-center">Yükleniyor...</div>;
  }

  return (
    <div className="pb-32">
      <section className="course-detail-video-wrapper">
        <div 
          className="course-detail-video-bg"
          style={{ backgroundImage: `url('${course.image}')` }}
        ></div>
        <div 
          className="course-detail-video-overlay"
          onClick={() => navigate(isEnrolled ? '/watch/' + course.id : '/payment/' + course.id)}
        >
          <div className="course-detail-play-btn">
            <span className="material-symbols-outlined play-icon-large">play_arrow</span>
          </div>
        </div>
      </section>

      <section className="py-lg">
        <div className="badge-row">
          <span className="badge-tag">En Çok Satan</span>
          <span className="badge-tag-secondary">{course.category}</span>
        </div>
        <h1 className="text-headline-lg detail-title">{course.title}</h1>
        <p className="text-body-lg detail-description">{course.description}</p>
        <div className="detail-meta-row">
          <span className="text-title-lg text-secondary">{course.rating}</span>
          <div className="detail-stars-wrapper">
            <span className="material-symbols-outlined">star</span>
            <span className="material-symbols-outlined">star</span>
            <span className="material-symbols-outlined">star</span>
            <span className="material-symbols-outlined">star</span>
            <span className="material-symbols-outlined">star_half</span>
          </div>
          <span className="text-caption text-on-surface-variant">({course.ratingCount} değerlendirme)</span>
          <span className="text-outline-variant">•</span>
          <span className="text-caption text-on-surface-variant">{course.students} öğrenci</span>
        </div>

        <div className="detail-instructor-card">
          <div className="detail-instructor-avatar-wrapper">
            <img 
              className="full-image-cover" 
              src={course.instructor.avatar} 
              alt={course.instructor.name} 
            />
          </div>
          <div className="flex-grow">
            <span className="text-caption instructor-label">Eğitmen</span>
            <span className="text-title-lg instructor-name">{course.instructor.name}</span>
            <span className="text-label-md instructor-role">{course.instructor.role}</span>
          </div>
        </div>
      </section>

      <section className="detail-outcomes-box">
        <h2 className="text-headline-md detail-outcomes-title">Bu kursta neler öğreneceksiniz?</h2>
        <div className="grid-gap-md">
          {course.learningOutcomes.map((outcome, index) => (
            <div key={index} className="flex gap-sm">
              <span className="material-symbols-outlined outcome-icon">check_circle</span>
              <p className="text-body-md">{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-xl">
        <div className="detail-curriculum-header">
          <h2 className="text-headline-md text-primary">Kurs İçeriği</h2>
          <span className="text-label-md text-on-surface-variant">Müfredat</span>
        </div>
        <div className="space-y-sm">
          {course.curriculum.map((section, sIndex) => (
            <div key={sIndex} className="curriculum-accordion">
              <div className="curriculum-section-header">
                <div className="text-left">
                  <span className="block text-title-lg">{section.title}</span>
                  <span className="text-caption text-on-surface-variant">{section.duration}</span>
                </div>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <div className="curriculum-lessons-wrapper">
                {section.lessons.map(lesson => (
                  <div key={lesson.id} className="flex-between-center">
                    <div className="flex-center-gap-sm">
                      <span className="material-symbols-outlined text-on-surface-variant">play_circle</span>
                      <span className="text-body-md">{lesson.title}</span>
                    </div>
                    <span className="text-caption">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="detail-footer">
        <div className="flex flex-col">
          <span className="detail-price-old">₺{course.oldPrice}</span>
          <span className="text-headline-lg text-primary">₺{course.price}</span>
        </div>
        <div className="flex gap-2">
          {isEnrolled ? (
            <button onClick={() => navigate('/watch/' + course.id)} className="btn-primary">
              <span>Derse Git</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          ) : (
            <>
              <button className="detail-cart-btn">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
              <button onClick={() => navigate('/payment/' + course.id)} className="detail-buy-btn">
                Hemen Al
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
