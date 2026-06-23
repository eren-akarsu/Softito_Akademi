import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  const categoryQuery = queryParams.get('cat') || '';

  useEffect(() => {
    fetch('/courses.json')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchQuery
      ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = categoryQuery
      ? course.category.toLowerCase() === categoryQuery.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div className="space-y-md">
      <section className="filter-bar no-scrollbar">
        <button 
          onClick={() => setSortBy('')} 
          className={sortBy === '' ? 'category-chip-active' : 'category-chip'}
        >
          En Yeni
        </button>
        <button 
          onClick={() => setSortBy('rating')} 
          className={sortBy === 'rating' ? 'category-chip-active' : 'category-chip'}
        >
          En Yüksek Puan
        </button>
        <button 
          onClick={() => setSortBy('price')} 
          className={sortBy === 'price' ? 'category-chip-active' : 'category-chip'}
        >
          En Düşük Fiyat
        </button>
      </section>

      <section>
        <p className="text-on-surface-variant text-label-lg">
          {sortedCourses.length} sonuç bulundu
          {categoryQuery && ` (${categoryQuery})`}
          {searchQuery && ` "${searchQuery}" için`}
        </p>
      </section>

      <section className="space-y-md">
        {sortedCourses.map(course => (
          <div 
            key={course.id} 
            className="course-card-horizontal block"
            onClick={() => navigate('/course/' + course.id)}
          >
            <div className="course-card-horizontal-img-wrapper">
              <img src={course.image} alt={course.title} className="course-card-horizontal-img" />
            </div>
            <div className="course-card-horizontal-content">
              <div>
                <h3 className="course-card-horizontal-title">{course.title}</h3>
                <p className="course-card-horizontal-author">{course.instructor.name}, {course.instructor.role}</p>
              </div>
              <div className="card-info-bottom-stack">
                <div className="rating-wrapper-row">
                  <span className="text-label-md text-on-surface">{course.rating}</span>
                  <div className="stars-wrapper">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span className="material-symbols-outlined text-[14px]">star_half</span>
                  </div>
                  <span className="text-caption text-on-surface-variant">({course.ratingCount})</span>
                </div>
                <div className="card-price-row">
                  <p className="text-title-lg text-primary">₺{course.price}</p>
                  {course.price > 1000 && <span className="badge-tag">En Popüler</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
