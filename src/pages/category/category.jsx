import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/Navbar/navbar";
import './category.css'

export default function Category() {
    const params = useParams()
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://dummyjson.com/recipes/tag/${params.tag}`)
            .then(res => res.json())
            .then((data) => {
                setRecipes(data.recipes)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching recipes:', error)
                setLoading(false)
            })
    }, [params.tag])

    return (
        <>
            <NavBar />
            <div className="category-container">
                {/* Category Header */}
                <section className="category-header">
                    <div className="header-content">
                        <h1>📂 {params.tag}</h1>
                        <p>Explore recipes in the {params.tag} category</p>
                    </div>
                </section>

                {/* Recipes Section */}
                <section className="category-section">
                    <div className="container">
                        {loading ? (
                            <div className="loading">Loading recipes...</div>
                        ) : recipes.length === 0 ? (
                            <div className="no-results">No recipes found in this category</div>
                        ) : (
                            <div className="recipes-list">
                                {recipes.map((recipe) => (
                                    <div key={recipe.id} className="recipe-item">
                                        <div className="recipe-image">
                                            <img src={recipe.image} alt={recipe.name} />
                                            <div className="rating-badge">{recipe.rating} ⭐</div>
                                        </div>
                                        <div className="recipe-details">
                                            <h3 className="recipe-name">{recipe.name}</h3>
                                            <div className="recipe-meta-info">
                                                <span className="cuisine-tag">🍽️ {recipe.cuisine}</span>
                                                <span className="difficulty-tag">{recipe.difficulty}</span>
                                            </div>
                                            <div className="recipe-stats">
                                                <div className="stat">
                                                    <span className="stat-label">⏱️ Prep Time</span>
                                                    <span className="stat-value">{recipe.prepTimeMinutes} min</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">👥 Servings</span>
                                                    <span className="stat-value">{recipe.servings}</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">📊 Calories</span>
                                                    <span className="stat-value">{recipe.caloriesPerServing}</span>
                                                </div>
                                            </div>
                                            <Link to={`recipe/${recipe.id}`} className="view-details-btn text-decoration-none">View Full Recipe</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    )
}