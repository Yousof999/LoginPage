import { useEffect, useState } from "react"
import NavBar from "../../components/Navbar/navbar";
import './home.css'
import { Link } from "react-router-dom";

export default function Home() {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://dummyjson.com/recipes')
            .then(res => res.json())
            .then(data => {
                setRecipes(data.recipes)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching recipes:', error)
                setLoading(false)
            })
    }, [])

    return (
        <>
            <NavBar />
            <div className="home-container">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Discover Delicious Recipes</h1>
                        <p>Explore a variety of tasty dishes from around the world</p>
                    </div>
                </section>

                {/* Recipes Section */}
                <section className="recipes-section">
                    <div className="container">
                        {loading ? (
                            <div className="loading">Loading recipes...</div>
                        ) : (
                            <div className="recipes-grid">
                                {recipes.map((recipe) => (
                                    <div key={recipe.id} className="recipe-card">
                                        <div className="card-image-wrapper">
                                            <img src={recipe.image} alt={recipe.name} className="card-image" />
                                            <div className="card-overlay">
                                                <Link to={`/category/${recipe.name}/recipe/${recipe.id}`} className="view-btn text-decoration-none">View Recipe</Link>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <h3 className="card-title">{recipe.name}</h3>
                                            <div className="recipe-info">
                                                <span className="recipe-meta">⏱ {recipe.prepTimeMinutes} min</span>
                                                <span className="recipe-meta">👥 {recipe.servings} servings</span>
                                            </div>
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