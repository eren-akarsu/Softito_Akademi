export default function Navbar({ categories, selectedCategory, setSelectedCategory, setView }) {
  return (
    <nav className="nav-categories">
      <div className="nav-container">
        {categories.map((cat) => (
          <span
            key={cat}
            className={`nav-link ${selectedCategory === cat ? 'nav-link-active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat)
              setView('home')
            }}
          >
            {cat}
          </span>
        ))}
      </div>
    </nav>
  )
}
