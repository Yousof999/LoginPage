import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/Navbar/navbar";
import './recipe.css';

export default function Recipe() {
    const params = useParams()
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`https://dummyjson.com/recipes/${params.id}`)
            .then(res => res.json())
            .then((data) => {
                setRecipe(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }, [params.id])

    return (
        <>
            <NavBar />
            <div className="recipe-container">
                {loading ? (
                    <div className="loading">Loading recipe...</div>
                ) : error ? (
                    <div className="error">Error loading recipe: {error}</div>
                ) : recipe ? (
                    <>
                        {/* Hero Section with Image */}
                        <section className="recipe-hero">
                            <div className="hero-image">
                                <img src={recipe.image} alt={recipe.name} />
                            </div>
                            <div className="hero-overlay"></div>
                        </section>

                        {/* Recipe Details */}
                        <section className="recipe-details-section">
                            <div className="container">
                                <div className="recipe-card">
                                    {/* Header */}
                                    <div className="recipe-header">
                                        <h1 className="recipe-title">{recipe.name}</h1>
                                        <div className="recipe-badges">
                                            <span className="badge cuisine">🍽️ {recipe.cuisine}</span>
                                            <span className="badge difficulty">{recipe.difficulty}</span>
                                            <span className="badge rating">⭐ {recipe.rating}</span>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="quick-stats">
                                        <div className="stat-box">
                                            <span className="stat-icon">⏱️</span>
                                            <div className="stat-content">
                                                <p className="stat-label">Prep Time</p>
                                                <p className="stat-value">{recipe.prepTimeMinutes} min</p>
                                            </div>
                                        </div>
                                        <div className="stat-box">
                                            <span className="stat-icon">🍳</span>
                                            <div className="stat-content">
                                                <p className="stat-label">Cook Time</p>
                                                <p className="stat-value">{recipe.cookTimeMinutes} min</p>
                                            </div>
                                        </div>
                                        <div className="stat-box">
                                            <span className="stat-icon">👥</span>
                                            <div className="stat-content">
                                                <p className="stat-label">Servings</p>
                                                <p className="stat-value">{recipe.servings}</p>
                                            </div>
                                        </div>
                                        <div className="stat-box">
                                            <span className="stat-icon">🔥</span>
                                            <div className="stat-content">
                                                <p className="stat-label">Calories</p>
                                                <p className="stat-value">{recipe.caloriesPerServing}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="recipe-body">
                                        <div className="recipe-main">
                                            {/* Ingredients */}
                                            <div className="recipe-section">
                                                <h2 className="section-title">📋 Ingredients</h2>
                                                <ul className="ingredients-list">
                                                    {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                                        <li key={index} className="ingredient-item">
                                                            <span className="ingredient-icon">✓</span>
                                                            {ingredient}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Instructions */}
                                            <div className="recipe-section">
                                                <h2 className="section-title">👨‍🍳 Instructions</h2>
                                                <ol className="instructions-list">
                                                    {recipe.instructions && recipe.instructions.map((instruction, index) => (
                                                        <li key={index} className="instruction-item">
                                                            <span className="step-number">{index + 1}</span>
                                                            <p>{instruction}</p>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        </div>

                                        {/* Sidebar */}
                                        <aside className="recipe-sidebar">
                                            {/* Nutrients */}
                                            <div className="sidebar-box">
                                                <h3 className="sidebar-title">🥗 Nutrition Info</h3>
                                                <div className="nutrition-info">
                                                    <div className="nutrition-item">
                                                        <span className="nutrition-label">Calories</span>
                                                        <span className="nutrition-value">{recipe.caloriesPerServing}</span>
                                                    </div>
                                                    <div className="nutrition-item">
                                                        <span className="nutrition-label">Protein</span>
                                                        <span className="nutrition-value">{recipe.proteinPerServing || 'N/A'}</span>
                                                    </div>
                                                    <div className="nutrition-item">
                                                        <span className="nutrition-label">Carbs</span>
                                                        <span className="nutrition-value">{recipe.carbs || 'N/A'}</span>
                                                    </div>
                                                    <div className="nutrition-item">
                                                        <span className="nutrition-label">Fat</span>
                                                        <span className="nutrition-value">{recipe.fat || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            {recipe.tags && recipe.tags.length > 0 && (
                                                <div className="sidebar-box">
                                                    <h3 className="sidebar-title">🏷️ Tags</h3>
                                                    <div className="tags-container">
                                                        {recipe.tags.map((tag, index) => (
                                                            <span key={index} className="tag">{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </aside>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="error">Recipe not found</div>
                )}
            </div>
        </>
    )
}